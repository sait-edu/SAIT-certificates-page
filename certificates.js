window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const certId = params.get('id');

    fetch('certificates.json')
        .then(response => response.json())
        .then(data => {
            console.log(document.querySelector('.certificate__name'));
            console.log(document.getElementsByClassName('certificate__name')[0]);
            const cert = data.certificates.find(c => c.id === certId);
            if (cert) {
                document.querySelector('.certificate__name').textContent = `${cert.name}`;
                console.log(cert.name);
                document.querySelector('.certificate__camp').textContent = cert.camp;
            }
            else {
                document.querySelector('.certificate').innerHTML = 'Certificate not found.';
                document.querySelector('.certificate').style.fontWeight = "900";
                document.querySelector('.certificate').style.fontSize = "2rem";
                document.querySelector('.certificate').style.textAlign = "center";
            }
        });
});
