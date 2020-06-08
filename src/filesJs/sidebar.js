import $ from 'jquery';

export function sidebarFiles() {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
}
