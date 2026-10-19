
console.log("BUTTON SOUND SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", () => {
    const isWeek01Page =
        window.location.pathname.includes("/week01/");

    const clickSound = new Audio(
        isWeek01Page
            ? "../sounds/click.mp3"
            : "sounds/click.mp3"
    );

    clickSound.preload = "auto";

    document.addEventListener("click", event => {
        const clickedElement = event.target.closest("button, a");

        if (!clickedElement) {
            return;
        }

        // Answer options use their own sound in script.js
        if (clickedElement.classList.contains("answer-option")) {
            return;
        }

        clickSound.currentTime = 0;

        const playPromise = clickSound.play();

        if (playPromise) {
            playPromise
                .then(() => {
                    console.log("CLICK SOUND PLAYING");
                })
                .catch(error => {
                    console.error("CLICK SOUND FAILED:", error);
                });
        }

        // Delay same-tab navigation to let the sound start
        if (
            clickedElement.tagName === "A" &&
            clickedElement.href &&
            clickedElement.target !== "_blank" &&
            !clickedElement.hasAttribute("download")
        ) {
            const destination = new URL(clickedElement.href);

            if (
                destination.origin === window.location.origin &&
                destination.href !== window.location.href
            ) {
                event.preventDefault();

                setTimeout(() => {
                    window.location.assign(destination.href);
                }, 500);
            }
        }
    });
});
