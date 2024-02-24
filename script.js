//your code here
 const images = document.querySelectorAll('img');
        let selectedImages = [];
        let verifyButtonShown = false;

        images.forEach((img) => {
            img.addEventListener('click', () => {
                if (selectedImages.length < 2) {
                    img.classList.add('selected');
                    selectedImages.push(img);
                }

                if (selectedImages.length === 2) {
                    document.getElementById('verify').style.display = 'block';
                }
            });
        });

        document.getElementById('verify').addEventListener('click', () => {
            if (selectedImages[0].src === selectedImages[1].src) {
                document.getElementById('para').textContent = 'You are a human. Congratulations!';
            } else {
                document.getElementById('para').textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
            }
            document.getElementById('verify').style.display = 'none';
            document.getElementById('reset').style.display = 'block';
        });

        document.getElementById('reset').addEventListener('click', () => {
            images.forEach((img) => {
                img.classList.remove('selected');
            });
            selectedImages = [];
            document.getElementById('verify').style.display = 'none';
            document.getElementById('reset').style.display = 'none';
            document.getElementById('para').textContent = '';
        });