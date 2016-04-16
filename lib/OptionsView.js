'use babel';

/** @jsx elementCreator */
import elementCreator from './elementCreator';
import EventEmitter from 'events';

export default class OptionsView {
	constructor (currentOptions = {}) {
		this.emitter = new EventEmitter();
		this.el =
		<div class="test">
			<div class='block'>
				<label>Credentials for sandbox</label>
			</div>
			<div class='block'>
				<div class="controls">
					<label class="control-label">
						HostName
					</label>
					<div class="controls">
						<div class="editor-container">
							<atom-text-editor mini="" class="mini editor bart-hostname"
								tabindex="1" id="bart-hostname"
								placeholder-text="some.demandware.net"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class='block'>
				<div class="controls">
					<label class="control-label">
						UserName
					</label>
					<div class="controls">
						<div class="editor-container">
							<atom-text-editor mini="" class="mini editor bart-username"
								tabindex="2" id="bart-username"
								placeholder-text="Your username on sandbox"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class='block'>
				<div class="controls">
					<label class="control-label">
						Password
					</label>
					<div class="controls">
						<div class="editor-container">
							<atom-text-editor mini="" class="mini editor bart-password"
								tabindex="3" id="bart-password"
								placeholder-text="Your password on sandbox"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class='block'>
				<div class="controls">
					<label class="control-label">
						Code version
					</label>
					<div class="controls">
						<div class="editor-container">
							<atom-text-editor mini="" class="mini editor bart-version"
								tabindex="4" id="bart-codeversion"
								placeholder-text="Current code version"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class='block'>
				<button class="btn" onClick={this.onSave.bind(this)} >Save</button>
				<button class="btn" onClick={this.onCancel.bind(this)}>Cancel</button>
				<div class="error-messages js-bart_error" ></div>
			</div>
		</div>;

		[
			'hostname',
			'username',
			'version'
		].forEach((key) => {
			const div = this.el.getElementsByClassName('bart-' + key);
			if (div && div.length) {
				div[0].getModel().setText(currentOptions[key]);
			}
		});
	}
	setError (msg = '') {
		const div = this.el.getElementsByClassName('js-bart_error');
		if (div && div.length) {
			div[0].textContent = msg;
		}
	}
	clean () {
		const div = this.el.getElementsByClassName('bart-password');
		if (div && div.length) {
			div[0].getModel().setText('');
		}
	}
	on (name, fn) {
		this.emitter.on(name, fn);
	}
	off (name, fn) {
		this.emitter.off(name, fn);
	}
	onSave () {
		const config = [
			'hostname',
			'username',
			'password',
			'version'
		].reduce((acc, elemClass) => {
			const div = this.el.getElementsByClassName('bart-' + elemClass);
			if (div && div.length) {
				acc[elemClass] = div[0].getModel().getText();
			}
			return acc;
		}, {});
		this.emitter.emit('save', config);
	}
	onCancel () {
		this.emitter.emit('cancel');
	}
	getElement() {
		return this.el;
	}
}