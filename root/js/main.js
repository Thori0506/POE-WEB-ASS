/* ==========================================================
   INTO YARN - main.js (v2.0.0)
   Runs on every page. Each feature only starts if the
   elements it needs exist on the current page.
   ========================================================== */
(function () {
    "use strict";

    /* ---------- Settings ---------- */
    // Contact/enquiry messages are POSTed here. FormSubmit is a free service that
    // forwards the message to the address in the URL. The FIRST message sent makes
    // FormSubmit email a one-time activation link to that address - click it once.
    // If sending fails (offline, not activated) the form falls back to mailto:.
    var STORE_EMAIL = "admin@intoyarn.co.za";
    var FORM_ENDPOINT = "https://formsubmit.co/ajax/" + STORE_EMAIL;
    var CART_KEY = "intoyarn-cart";

    // Store hours (24h clock, South African time). 0 = Sunday ... 6 = Saturday
    var HOURS = { 0: null, 1: [9, 16], 2: [9, 16], 3: [9, 16], 4: [9, 16], 5: [9, 16], 6: [9, 13] };

    /* ---------- Product data (dynamic content) ---------- */
    var PRODUCTS = [
        { id: 1, name: "Rainbow Yarn", price: 219, category: "Balls", img: "images/rainbow-variegated-yarn-balls.jpg",
          alt: "Three balls of rainbow variegated yarn in pink, orange, green and purple", desc: "Self-striping rainbow yarn for scarves and blankets." },
        { id: 2, name: "Pink Yarn", price: 260, category: "Balls", img: "images/pink-speckled-yarn-balls.jpg",
          alt: "Three balls of soft pink speckled yarn", desc: "Soft pink speckled yarn, ideal for baby items." },
        { id: 3, name: "Colourful Yarn", price: 180, category: "Balls", img: "images/assorted-colour-yarn-balls.jpg",
          alt: "Assorted balls of yarn in blue, mustard, red, cream and grey", desc: "A mixed bundle of bold, colourful yarn balls." },
        { id: 4, name: "Pastel Yarn", price: 320, category: "Balls", img: "images/pastel-gradient-yarn-cakes.jpg",
          alt: "Pastel gradient yarn cakes in pink, mint, cream and peach", desc: "Gradient pastel cakes that change colour as you knit." },
        { id: 5, name: "Mixed Skeins", price: 150, category: "Skeins", img: "images/stacked-hand-dyed-yarn-skeins.webp",
          alt: "Stacked hand-dyed yarn skeins in teal, pink, green and orange", desc: "Hand-dyed skeins in a rich mix of colours." },
        { id: 6, name: "Speckled Skeins", price: 320, category: "Skeins", img: "images/blue-speckled-hand-dyed-skeins.webp",
          alt: "Blue speckled hand-dyed yarn skeins with pink and yellow flecks", desc: "Blue hand-dyed skeins with bright speckles." },
        { id: 7, name: "Pastel Yarn Pack", price: 320, category: "Balls", img: "images/pastel-yarn-ball-pack.webp",
          alt: "A pack of pastel yarn balls in blue, pink, lilac and yellow", desc: "A pack of soft pastel balls for baby blankets." },
        { id: 8, name: "Bright Skeins", price: 320, category: "Skeins", img: "images/bright-hand-dyed-yarn-skeins.jpg",
          alt: "Bright hand-dyed yarn skeins in orange, yellow, green and blue", desc: "Vibrant hand-dyed skeins that make any project pop." },
        { id: 9, name: "Acrylic Yarn Set", price: 320, category: "Sets", img: "images/acrylic-worsted-yarn-set.webp",
          alt: "A multi-pack acrylic worsted yarn set in many colours with a crochet hook", desc: "A starter set of worsted acrylic yarn with a hook." }
    ];

    /* ---------- Small helpers ---------- */
    function $(sel, root) { return (root || document).querySelector(sel); }
    function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    function money(n) { return "R" + Number(n).toFixed(2); }
    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }
    function byId(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }

    function toast(msg) {
        var t = $("#toast");
        if (!t) {
            t = document.createElement("div");
            t.id = "toast";
            t.setAttribute("role", "status");
            t.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#2c2c2c;" +
                "color:#fff;padding:12px 20px;border-radius:8px;z-index:3000;opacity:0;transition:opacity .3s;max-width:90vw";
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.style.opacity = "1";
        clearTimeout(toast._t);
        toast._t = setTimeout(function () { t.style.opacity = "0"; }, 2200);
    }

    /* ==========================================================
       1. CART (saved in localStorage so it survives page changes)
       ========================================================== */
    var cart = {};   // { productId: quantity }

    function loadCart() {
        try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { cart = {}; }
    }
    function saveCart() {
        try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* private mode: keep in memory */ }
    }
    function cartCount() {
        return Object.keys(cart).reduce(function (n, id) { return n + cart[id]; }, 0);
    }
    function cartTotal() {
        return Object.keys(cart).reduce(function (sum, id) {
            var p = byId(Number(id));
            return sum + (p ? p.price * cart[id] : 0);
        }, 0);
    }
    function addToCart(id) {
        cart[id] = (cart[id] || 0) + 1;
        saveCart(); renderCart();
        toast(byId(id).name + " added to your cart");
    }
    function changeQty(id, delta) {
        cart[id] = (cart[id] || 0) + delta;
        if (cart[id] <= 0) delete cart[id];
        saveCart(); renderCart();
    }

    function renderCart() {
        $all("[data-cart-count]").forEach(function (el) { el.textContent = cartCount(); });

        var box = $("#cart-items"), total = $("#cart-total");
        if (!box || !total) return;

        var ids = Object.keys(cart).filter(function (id) { return byId(Number(id)); });
        if (ids.length === 0) {
            box.innerHTML = '<p class="cart-empty">Your cart is empty. Add some yarn above!</p>';
        } else {
            box.innerHTML = ids.map(function (id) {
                var p = byId(Number(id)), q = cart[id];
                return '<div class="cart-row">' +
                    '<div class="who"><img src="' + esc(p.img) + '" alt="" width="48" height="48"><span>' + esc(p.name) + '</span></div>' +
                    '<div class="qty">' +
                    '<button type="button" data-qty="-1" data-id="' + p.id + '" aria-label="Decrease quantity of ' + esc(p.name) + '">&minus;</button>' +
                    '<span aria-live="polite">' + q + '</span>' +
                    '<button type="button" data-qty="1" data-id="' + p.id + '" aria-label="Increase quantity of ' + esc(p.name) + '">+</button>' +
                    '</div><strong>' + money(p.price * q) + '</strong>' +
                    '<button type="button" class="remove-btn" data-remove="' + p.id + '" aria-label="Remove ' + esc(p.name) + ' from cart">&times;</button>' +
                    '</div>';
            }).join("");
        }
        total.textContent = "Total: " + money(cartTotal());
    }

    function initCart() {
        loadCart();
        renderCart();

        // One listener handles every cart/add button, even ones created later.
        document.addEventListener("click", function (e) {
            var add = e.target.closest("[data-add]");
            if (add) { addToCart(Number(add.getAttribute("data-add"))); return; }
            var q = e.target.closest("[data-qty]");
            if (q) { changeQty(Number(q.getAttribute("data-id")), Number(q.getAttribute("data-qty"))); return; }
            var r = e.target.closest("[data-remove]");
            if (r) { delete cart[r.getAttribute("data-remove")]; saveCart(); renderCart(); }
        });

        var checkoutBtn = $("#checkout-btn"), dlg = $("#checkout-dialog");
        if (checkoutBtn && dlg) {
            checkoutBtn.addEventListener("click", function () {
                if (cartCount() === 0) { toast("Your cart is empty - add some yarn first."); return; }
                $("#checkout-total").textContent = money(cartTotal());
                if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
            });
            $("#checkout-cancel").addEventListener("click", function () {
                if (dlg.close) dlg.close(); else dlg.removeAttribute("open");
            });
            wireForm($("#checkout-form"), function (form) {
                var name = form.elements.name.value.trim();
                var total = money(cartTotal());
                cart = {}; saveCart(); renderCart();
                form.reset();
                if (dlg.close) dlg.close(); else dlg.removeAttribute("open");
                var s = $("#order-status");
                s.className = "form-status ok show";
                s.innerHTML = "<strong>Order received!</strong> Thank you, " + esc(name) + ". Your order total is " + esc(total) +
                    ". This is a demonstration checkout, so no payment was taken.";
                s.scrollIntoView({ behavior: "smooth", block: "center" });
            });
        }
    }

    /* ==========================================================
       2. PRODUCT LIST: dynamic render + search + filter + sort
       ========================================================== */
    function productCard(p) {
        return '<article class="product-card">' +
            '<button type="button" class="img-btn" data-lightbox data-caption="' + esc(p.name + " - " + p.desc) + '" aria-label="Enlarge photo of ' + esc(p.name) + '">' +
            '<img src="' + esc(p.img) + '" alt="' + esc(p.alt) + '" loading="lazy" width="400" height="220"></button>' +
            '<h3>' + esc(p.name) + '</h3>' +
            '<p class="tag">' + esc(p.category) + ' &middot; ' + esc(p.desc) + '</p>' +
            '<p class="price">' + money(p.price) + '</p>' +
            '<button type="button" class="btn" data-add="' + p.id + '">Add to cart</button>' +
            '</article>';
    }

    function initProducts() {
        var grid = $("#product-grid");
        if (!grid) return;
        var search = $("#search"), cat = $("#category"), sort = $("#sort");
        var count = $("#result-count"), none = $("#no-results");

        function render() {
            var q = search.value.trim().toLowerCase();
            var list = PRODUCTS.filter(function (p) {
                var text = (p.name + " " + p.category + " " + p.desc).toLowerCase();
                return (!q || text.indexOf(q) !== -1) && (cat.value === "all" || p.category === cat.value);
            });
            if (sort.value === "low") list.sort(function (a, b) { return a.price - b.price; });
            if (sort.value === "high") list.sort(function (a, b) { return b.price - a.price; });
            if (sort.value === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });

            grid.innerHTML = list.map(productCard).join("");
            none.hidden = list.length !== 0;
            count.textContent = "Showing " + list.length + " of " + PRODUCTS.length + " products";
        }
        [search, cat, sort].forEach(function (el) { el.addEventListener("input", render); });
        render();
    }

    function initFeatured() {
        var box = $("#featured");
        if (box) box.innerHTML = PRODUCTS.slice(0, 3).map(productCard).join("");
    }

    /* ==========================================================
       3. LIGHTBOX (products + gallery): keyboard, arrows, Esc
       ========================================================== */
    function initLightbox() {
        var box = document.createElement("div");
        box.className = "lightbox";
        box.setAttribute("role", "dialog");
        box.setAttribute("aria-modal", "true");
        box.setAttribute("aria-label", "Image viewer");
        box.innerHTML =
            '<button type="button" class="lb-btn lb-close" aria-label="Close image viewer">&times;</button>' +
            '<button type="button" class="lb-btn lb-prev" aria-label="Previous image">&#8249;</button>' +
            '<figure><img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt=""><figcaption></figcaption></figure>' +
            '<button type="button" class="lb-btn lb-next" aria-label="Next image">&#8250;</button>';
        document.body.appendChild(box);

        var img = $("img", box), cap = $("figcaption", box);
        var items = [], index = 0, opener = null;

        function show(i) {
            index = (i + items.length) % items.length;
            var el = items[index], pic = $("img", el);
            img.src = pic.currentSrc || pic.src;
            img.alt = pic.alt;
            cap.textContent = el.getAttribute("data-caption") || pic.alt;
            var multi = items.length > 1;
            $(".lb-prev", box).style.display = multi ? "" : "none";
            $(".lb-next", box).style.display = multi ? "" : "none";
        }
        function open(el) {
            items = $all("[data-lightbox]");        // re-read so filtered lists work
            opener = el;
            show(items.indexOf(el));
            box.classList.add("open");
            document.body.style.overflow = "hidden";
            $(".lb-close", box).focus();
        }
        function close() {
            box.classList.remove("open");
            document.body.style.overflow = "";
            if (opener) opener.focus();
        }

        document.addEventListener("click", function (e) {
            var trigger = e.target.closest("[data-lightbox]");
            if (trigger) { open(trigger); return; }
            if (e.target === box || e.target.closest(".lb-close")) close();
            else if (e.target.closest(".lb-prev")) show(index - 1);
            else if (e.target.closest(".lb-next")) show(index + 1);
        });
        document.addEventListener("keydown", function (e) {
            if (!box.classList.contains("open")) return;
            if (e.key === "Escape") close();
            else if (e.key === "ArrowLeft") show(index - 1);
            else if (e.key === "ArrowRight") show(index + 1);
            else if (e.key === "Tab") {                 // keep focus inside the viewer
                var f = $all("button", box).filter(function (b) { return b.style.display !== "none"; });
                var first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
    }

    /* ==========================================================
       4. FORM VALIDATION (shared by enquiry, contact, checkout)
       Fields use data-rule="name|email|phone|address|message|select"
       ========================================================== */
    var RULES = {
        name: function (v) {
            if (!v) return "Please enter your full name.";
            if (v.length < 2 || !/^[\p{L}][\p{L} '’.\-]*$/u.test(v)) return "Names can only contain letters, spaces, hyphens and apostrophes.";
            return "";
        },
        email: function (v) {
            if (!v) return "Please enter your email address.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email address, e.g. name@example.com.";
            return "";
        },
        phone: function (v) {                    // optional field
            if (!v) return "";
            var d = v.replace(/[\s\-()]/g, "");
            return /^(\+27|0)\d{9}$/.test(d) ? "" : "Enter a South African number, e.g. 084 032 4433 or +27 84 032 4433.";
        },
        address: function (v) {
            if (!v) return "Please enter your delivery address.";
            return v.length < 8 ? "Please enter your full street address (at least 8 characters)." : "";
        },
        message: function (v) {
            if (!v) return "Please type your message.";
            if (v.length < 10) return "Your message is too short - please write at least 10 characters.";
            if (v.length > 1000) return "Your message is too long - please keep it under 1000 characters.";
            return "";
        },
        subject: function (v) {
            if (!v) return "Please enter a subject.";
            return v.length < 3 ? "Your subject is too short." : "";
        },
        select: function (v) { return v ? "" : "Please choose an option from the list."; }
    };

    function fieldError(field) {
        var rule = RULES[field.getAttribute("data-rule")];
        return rule ? rule(field.value.trim()) : "";
    }
    function showError(field, msg) {
        var out = document.getElementById(field.id + "-error");
        if (out) out.textContent = msg;
        if (msg) field.setAttribute("aria-invalid", "true"); else field.removeAttribute("aria-invalid");
    }

    // Validates on blur, re-checks as the user types, and runs onValid(form) when all fields pass.
    function wireForm(form, onValid) {
        if (!form) return;
        var fields = $all("[data-rule]", form);
        fields.forEach(function (f) {
            f.addEventListener("blur", function () { showError(f, fieldError(f)); });
            f.addEventListener("input", function () { if (f.hasAttribute("aria-invalid")) showError(f, fieldError(f)); });
        });
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var firstBad = null;
            fields.forEach(function (f) {
                var msg = fieldError(f);
                showError(f, msg);
                if (msg && !firstBad) firstBad = f;
            });
            if (firstBad) { firstBad.focus(); return; }
            onValid(form);
        });
    }

    /* ==========================================================
       5. ENQUIRY + CONTACT: send message (with mailto fallback)
       ========================================================== */
    function initMessageForms() {
        $all("form[data-send]").forEach(function (form) {
            wireForm(form, function () {
                var status = $("#" + form.getAttribute("data-status"));
                var btn = $("button[type=submit]", form);
                var data = {};
                $all("input, select, textarea", form).forEach(function (el) {
                    if (!el.name || el.name === "website") return;
                    if ((el.type === "radio" || el.type === "checkbox") && !el.checked) return;
                    data[el.name] = el.type === "checkbox" ? "Yes" : el.value.trim();
                });
                // Honeypot: bots fill the hidden "website" box, people never see it.
                if (form.elements.website && form.elements.website.value) { form.reset(); return; }

                var subject = "Into Yarn website: " + (form.getAttribute("data-subject") || "message") +
                    (data.enquiryType ? " (" + data.enquiryType + ")" : "");
                var payload = Object.assign({ _subject: subject, _captcha: "false", _template: "table" }, data);

                btn.disabled = true; btn.textContent = "Sending...";
                var ctl = (typeof AbortController !== "undefined") ? new AbortController() : null;
                var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 9000);

                fetch(FORM_ENDPOINT, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Accept": "application/json" },
                    body: JSON.stringify(payload),
                    signal: ctl ? ctl.signal : undefined
                }).then(function (res) {
                    return res.json().then(function (j) { return { ok: res.ok, body: j }; });
                }).then(function (r) {
                    if (!r.ok || r.body.success === "false" || r.body.success === false) throw new Error("send failed");
                    status.className = "form-status ok show";
                    status.innerHTML = "<strong>Thank you, " + esc(data.name) + "!</strong> Your message has been sent. We will reply to " +
                        esc(data.email) + " as soon as we can.";
                    form.reset();
                }).catch(function () {
                    var body = Object.keys(data).map(function (k) { return k + ": " + data[k]; }).join("\n");
                    status.className = "form-status warn show";
                    status.innerHTML = "We couldn't send your message automatically. Your email app should open with the message ready - " +
                        'just press send. Or email us directly at <a href="mailto:' + STORE_EMAIL + '">' + STORE_EMAIL + "</a>.";
                    window.location.href = "mailto:" + STORE_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
                }).then(function () {
                    clearTimeout(timer);
                    btn.disabled = false; btn.textContent = btn.getAttribute("data-label");
                    status.scrollIntoView({ behavior: "smooth", block: "nearest" });
                });
            });
        });
    }

    /* ==========================================================
       6. OPEN / CLOSED STATUS (dynamic content, South African time)
       ========================================================== */
    function initOpenStatus() {
        var els = $all("[data-open-status]");
        if (!els.length) return;
        var parts = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Africa/Johannesburg", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
        }).formatToParts(new Date());
        var get = function (t) { return parts.filter(function (p) { return p.type === t; })[0].value; };
        var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
        var hour = Number(get("hour")) + Number(get("minute")) / 60;
        var h = HOURS[day];
        var open = h && hour >= h[0] && hour < h[1];
        els.forEach(function (el) {
            el.className = "badge " + (open ? "open" : "closed");
            el.textContent = open ? "We're open now (until " + h[1] + ":00)" : "We're closed right now";
        });
    }

    /* ---------- Start ---------- */
    document.addEventListener("DOMContentLoaded", function () {
        $all("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
        $all("button[type=submit][data-label]").forEach(function (b) { b.textContent = b.getAttribute("data-label"); });
        initProducts();
        initFeatured();
        initLightbox();
        initCart();
        initMessageForms();
        initOpenStatus();
    });

    // Exposed for automated testing only
    window.__intoYarn = { RULES: RULES, PRODUCTS: PRODUCTS };
})();
