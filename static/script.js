 $(document).on('mouseenter', ".wrap", function() {
     var $this = $(this);
     if(this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
          $this.tooltip({
               title: $this.text(),
               placement: "bottom"
          });
          $this.tooltip('show');
     }
});

$(document).on('mouseenter', ".artist", function() {
     var $this = $(this);
     if(this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
          $this.tooltip({
               title: $this.text(),
               placement: "bottom"
          });
          $this.tooltip('show');
     }
});