import Vue from 'vue';
import FilePicker from './components/file_picker.vue';
import FileExplorer from './file_explorer';

/**
 * Selects all file picker inputs
 * @return {NodeList} selected elements
 */
function filepicker_inputs() {
  return document.body.querySelectorAll('input[data-filepicker]');
}
/**
 * Adds file select button
 * @param {string} id The id of the input element
 */
function add_button(id) {
  let button = document.createElement('button');

  button.classList.add('btn', 'btn-primary');
  button.type = 'button';
  button.setAttribute('style', 'margin-bottom: 15px;');
  button.dataset.toggle = 'modal';
  button.dataset.target = `#modal-for-${id}`;
  button.innerHTML = 'Select file';

  document.body.querySelector('#' + id)
    .parentNode
    .append(button);
}

/**
 * Attaches file pickers to the DOM
 *
 * File pickers are inputs with a data attribute of filepicker
 */
export function attach_filepickers() {
  let main_div = document.body.querySelector('div[role="main"]');
  let fs = new FileExplorer();

  for(let fp_input of filepicker_inputs()) {
  	let fp_id = fp_input.id;
    let div = document.createElement('div');
    div.id = `filepicker-for-${fp_id}`;
    main_div.append(div);
    add_button(fp_id);
    let vue = new Vue({
      el: `#filepicker-for-${fp_id}`,
      render: fn => fn(
        FilePicker,
        {
          props: {
            input: fp_input,
            fs: fs,
            path: fs.last_path()
          }
        }
      )
    });
  }
}