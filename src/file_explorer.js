import * as pathmod from 'path-browserify';
import * as jQuery from 'jquery';

/**
 * Interface to OnDemand's File Explorer API
 */
export default class FileExplorer {
  constructor() {
    // Fallback to root if fetch fails
    this.home_dir = window.localStorage.getItem('files_home_dir') || '/';
    this.fs_api_root = '/pun/sys/files/api/v1/fs/';
    this.favorites = JSON.parse(window.localStorage.getItem('files_favorites')) || [];
  }

  /**
   * Initialize and store $HOME in localStorage
   *
   * This is a hack that relies on the Dashboard's File Explorer favorites menu.
   * 
   * @return {void}
   */
  init(callback) {
    if(this.home_dir != '/') {
      callback();
      return;
    }

    let self = this;
    // Note that this request isn't really necessary if called on a dashboard child page
    fetch('/pun/sys/dashboard').then(function(response) {
      response.text().then(function(text) {
        self.setFavorites();

        self.home_dir = self.favorites[0].href;
        window.localStorage.setItem('files_home_dir', self.home_dir);

        if(self.last_path() === '/') {
          self.update_last_location(self.home_dir);
        }

        callback();
      });
    });
  }

  setFavorites(html) {
    this.favorites = jQuery('li[title="Files"] a[title]').toArray().map((element) => {
      return {
        title: element.title,
        href: element.href.replace(new RegExp('^.+/pun/sys/files/fs'), '')
      };
    });

    window.localStorage.setItem('files_favorites', JSON.stringify(this.favorites));
  }

  /**
   * Lists a path and passes result to a callback
   * @param  {string}   path     The path to be listed
   * @param  {Function} callback A callback taking the response JSON
   * @return {void}
   */
  list_path(path, callback) {
    fetch(this.fs_api_root + path.replace(/(^\/)/, '')).then(function(response) {
      response.json().then(callback);
    });
  }

  last_path() {
    return window.localStorage.getItem('files_last_path') || this.home_dir;
  }

  /**
   * Store the last path in localStorage
   * @param  {string} path
   * @return {void}
   */
  update_last_location(path) {
      window.localStorage.setItem('files_last_path', '' + path);
  }
}