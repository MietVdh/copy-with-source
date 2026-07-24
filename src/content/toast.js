export default showToast = (message) => {
    const toast = document.createElement("div");

    toast.textContent = message;

    Object.assign(toast.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 16px",
        background: "#323232",
        color: "white",
        borderRadius: "8px",
        fontFamily: "sans-serif",
        fontSize: "14px",
        zIndex: "2147483647",
        opacity: "0",
        transition: "opacity 0.2s ease",
        pointerEvents: "none"
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
    });

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 200);
    }, 1500);
}
