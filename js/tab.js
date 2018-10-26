// new Tab($('#tabView > a.ui-tab-tab').filter(function () {
//     return /^(:?javas|#)/.test(this.getAttribute('href'));
// }), {
//     callback: function () {
//         var line;
//         // IE10+
//         if ($.isFunction(history.pushState)) {
//             line = $(this).parent().find('i');
//             if (!line.length) {
//                 line = $('<i></i>').addClass('ui-tab-line').prependTo($(this).parent());
//             }
//             line.css({
//                 display: 'block',
//                 width: $(this).width(),
//                 left: $(this).position().left
//             });
//         }
//     }
// });

// $('#tabView > a').tab();
$('a[data-rel=tabTarget2]').click(function() {
    $('a[data-rel=tabTarget1]').attr("class","ui-tab-tab")
    $('article[id=tabTarget1]').attr("class","ui-tab-content")
    $('a[data-rel=tabTarget2]').attr("class","ui-tab-tab checked")
    $('article[id=tabTarget2]').attr("class","ui-tab-content checked")

});
$('a[data-rel=tabTarget1]').click(function() {
    $('a[data-rel=tabTarget2]').attr("class","ui-tab-tab")
    $('article[id=tabTarget2]').attr("class","ui-tab-content")
    $('a[data-rel=tabTarget1]').attr("class","ui-tab-tab checked")
    $('article[id=tabTarget1]').attr("class","ui-tab-content checked")

});