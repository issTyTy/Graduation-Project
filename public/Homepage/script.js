// JavaScript code
const form = document.querySelector('form');
const cpuSpan = document.querySelector('#selected-cpu');
const gpuSpan = document.querySelector('#selected-gpu');
const ramSpan = document.querySelector('#selected-ram');
const storageSpan = document.querySelector('#selected-storage');
const psuSpan = document.querySelector('#selected-psu');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	
	const cpuValue = document.querySelector('#cpu').value;
	const gpuValue = document.querySelector('#gpu').value;
	const ramValue = document.querySelector('#ram').value;
	const storageValue = document.querySelector('#storage').value;
	const psuValue = document.querySelector('#psu').value;
	
	cpuSpan.textContent = cpuValue;
	gpuSpan.textContent = gpuValue;
	ramSpan.textContent = ramValue;
	storageSpan.textContent = storageValue;
	psuSpan.textContent = psuValue;
});