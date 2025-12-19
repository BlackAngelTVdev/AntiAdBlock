document.addEventListener("DOMContentLoaded", function () {
    function generateUniqueId() {
        return "anti-adblock-" + Math.random().toString(36).substr(2, 9);
    }

    function createAdblockWarning() {
        const modalId = generateUniqueId();

        let existingModal = document.querySelector("[id^='anti-adblock-']");
        if (existingModal) existingModal.remove();

        const modal = document.createElement("div");
        modal.id = modalId;
        modal.style = `
            position: fixed; top: 0; left: 0; width: 100%;
            height: 100%; background: rgba(0, 0, 0, 0.7);
            color: #242424; font-family: Arial, sans-serif;
            z-index: 99999; display: flex; align-items: center;
            justify-content: center; flex-direction: column;
            backdrop-filter: blur(5px);
        `;

        const modalContent = document.createElement("div");
        modalContent.style = `
            max-width: 600px; width: 90%; padding: 30px; background: white;
            border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border: 4px solid #e13b3b; text-align: center;
        `;

        const image = document.createElement("img");
        image.src = "./Asset/Img/stop.png";
        image.alt = "Attention";
        image.style = "margin-bottom: 20px; width: 80px;";

        const title = document.createElement("h2");
        title.innerHTML = 'Bloqueur de publicité détecté';
        title.style = "margin-bottom: 15px; color: #d32f2f;";

        const message = document.createElement("p");
        message.innerText = "Notre site web est gratuit grâce à la publicité. Merci de désactiver votre bloqueur et d'actualiser la page pour accéder au contenu.";
        message.style = "font-size: 1.1rem; color: #555; line-height: 1.5;";

        const reloadButton = document.createElement("button");
        reloadButton.innerHTML = 'Actualiser la page';
        reloadButton.style = `
            background: #e13b3b; color: white;
            border: none; padding: 15px 40px; font-size: 16px;
            font-weight: bold; cursor: pointer; border-radius: 8px; 
            margin-top: 25px; transition: 0.3s;
        `;
        reloadButton.addEventListener("click", () => location.reload());

        modalContent.appendChild(image);
        modalContent.appendChild(title);
        modalContent.appendChild(message);
        modalContent.appendChild(reloadButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    setTimeout(() => {
        const bait = document.createElement("div");
        bait.id = "ad-detection-bait";
        bait.className = "ad ads advertisement ad-banner adbox ad-container ad-footer ad-header ad-label ad-sidebar ad-space ad-wrapper banner-ad big-ad sponsored-ad pop-up-ad popup promo-ad promoted-content sponsored-content adslot adsense google-ads ad-unit banner-wrapper native-ad video-ad interstitial-ad overlay-ad floating-ad sidebar-ads sticky-ads in-post-ad affiliate-ad ad-content";
        bait.style = "height: 1px; width: 1px; position: absolute; left: -10000px; top: -10000px; background-color: transparent; pointer-events: none;";
        document.body.appendChild(bait);

        function restoreModalStyles(modal) {
            if (modal) {
                modal.style = `
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.7); color: #242424; font-family: Arial, sans-serif;
                    z-index: 99999; text-align: center; display: flex; align-items: center;
                    justify-content: center; flex-direction: column; backdrop-filter: blur(5px);
                `;
            }
        }

        function checkAdBlock() {
            let bait = document.getElementById("ad-detection-bait");

            if (!bait || bait.offsetHeight === 0 || bait.offsetWidth === 0 || 
                getComputedStyle(bait).display === "none" || 
                getComputedStyle(bait).visibility === "hidden" || 
                getComputedStyle(bait).opacity === "0") {

                createAdblockWarning();

                setInterval(() => {
                    let modal = document.querySelector("[id^='anti-adblock-']");
                    let bait = document.getElementById("ad-detection-bait");

                    if (!modal || !bait) return;

                    if (bait.offsetHeight > 0 && bait.offsetWidth > 0 && 
                        getComputedStyle(bait).display !== "none" && 
                        getComputedStyle(bait).visibility !== "hidden" && 
                        getComputedStyle(bait).opacity !== "0") {
                        return;
                    }

                    if (modal && (
                        getComputedStyle(modal).display === "none" || 
                        getComputedStyle(modal).visibility === "hidden" || 
                        getComputedStyle(modal).opacity === "0" || 
                        modal.style.transform === "scale(0)" || 
                        modal.style.height === "0px" || 
                        modal.style.width === "0px"
                    )) {
                        createAdblockWarning();
                    } else {
                        restoreModalStyles(modal);
                    }
                }, 3000);
            }
        }

        setTimeout(checkAdBlock, 100);
        setInterval(checkAdBlock, 3000);

        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) {
                setTimeout(checkAdBlock, 500);
            }
        });

    }, 1000);
});