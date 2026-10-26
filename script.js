const productDialog = document.querySelector('.product-dialog');
const dialogImage = productDialog.querySelector('.dialog-image');
const dialogTitle = productDialog.querySelector('#dialog-title');
const dialogDescription = productDialog.querySelector('.dialog-description');
const confirmationDialog = document.querySelector('.confirmation-dialog');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');

menuToggle.addEventListener('click', () => {
	const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
	menuToggle.setAttribute('aria-expanded', String(!isExpanded));
	menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
	navigation.classList.toggle('is-open', !isExpanded);
});

navigation.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open navigation menu');
		navigation.classList.remove('is-open');
	});
});

document.querySelectorAll('.product-1').forEach((product) => {
	const imageBox = product.querySelector('.img-box');
	const image = imageBox.querySelector('img');

	imageBox.setAttribute('role', 'button');
	imageBox.setAttribute('tabindex', '0');
	imageBox.setAttribute('aria-label', `View details for ${product.querySelector('h2').textContent}`);

	const openProductDialog = () => {
		dialogImage.src = image.src;
		dialogImage.alt = image.alt;
		dialogTitle.textContent = product.querySelector('h2').textContent;
		dialogDescription.textContent = product.querySelector('p').textContent;
		productDialog.showModal();
	};

	imageBox.addEventListener('click', openProductDialog);
	imageBox.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			openProductDialog();
		}
	});
});

productDialog.querySelector('.dialog-close').addEventListener('click', () => {
	productDialog.close();
});

productDialog.querySelector('.purchase-button').addEventListener('click', () => {
	productDialog.close();
	confirmationDialog.showModal();
});

confirmationDialog.querySelector('.confirmation-close').addEventListener('click', () => {
	confirmationDialog.close();
});

productDialog.addEventListener('click', (event) => {
	if (event.target === productDialog) {
		productDialog.close();
	}
});
