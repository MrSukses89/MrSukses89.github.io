
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.section');
        const buttons = document.querySelectorAll('.btn');
        sections.forEach(section => section.classList.remove('active'));
        buttons.forEach(btn => btn.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    }

    function showFullScreen(sectionId) {
        const overlay = document.getElementById(`fullscreen-${sectionId}`);
        if (overlay) {
            overlay.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }

    function hideFullScreen(sectionId) {
        const overlay = document.getElementById(`fullscreen-${sectionId}`);
        if (overlay) {
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }