// Shared layout utilities — all mini-games use these for a consistent structure.
// Standard layout (4 fixed-height zones):
//   [pre]      — ASCII art display, never reflowing
//   [caption]  — main status text, min 3em
//   [sub]      — secondary info (counter, progress, guide…), min 2em
//   [btnRow]   — action buttons, always at the same position

export const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function initGameArea() {
	const el = document.getElementById('game-area');
	el.innerHTML = '';
	return el;
}

export function createPre() {
	const wrapper = document.createElement('div');
	Object.assign(wrapper.style, {
		height: '110px', width: '100%',
		display: 'flex', alignItems: 'center', justifyContent: 'center',
		overflow: 'hidden',
	});

	const inner = document.createElement('pre');
	Object.assign(inner.style, {
		textAlign: 'center', lineHeight: '1.5', margin: '0',
		fontFamily: 'monospace', whiteSpace: 'pre',
		width: '100%',
	});
	wrapper.appendChild(inner);

	Object.defineProperty(wrapper, 'textContent', {
		get() { return inner.textContent; },
		set(v) { inner.textContent = v; },
		configurable: true,
	});

	return wrapper;
}

export function createCaption(text = '') {
	const el = document.createElement('p');
	Object.assign(el.style, { minHeight: '3em', textAlign: 'center', margin: '4px 0', width: '100%' });
	el.textContent = text;
	return el;
}

export function createSub(text = '') {
	const el = document.createElement('p');
	Object.assign(el.style, { minHeight: '2em', textAlign: 'center', margin: '2px 0', opacity: '0.85', width: '100%' });
	el.textContent = text;
	return el;
}

export function createBtnRow() {
	const el = document.createElement('div');
	Object.assign(el.style, {
		display: 'flex', gap: '12px', justifyContent: 'center',
		width: '100%', margin: '12px 0', flexWrap: 'wrap',
	});
	return el;
}

export function createBtn(label, onClick) {
	const el = document.createElement('button');
	el.textContent = label;
	Object.assign(el.style, { fontSize: '1.1em', padding: '10px 20px' });
	if (onClick) el.addEventListener('click', onClick);
	return el;
}
