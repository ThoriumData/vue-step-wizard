// modal template

<template>
    <div class="modal" tabindex="-1">
    <div class="modal-dialog">
    <div class="modal-content">

              <div class="modal-header">
                <slot name="header">
                  <h5 class="modal-title">Modal title</h5>
                </slot>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>


              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </slot>
              </div>
    </div>
    </div>
    </div>
</template>

<script>
	export default {
		name: "modal",
		props:{
			selected: {
				default: false,
			},
			title: {
				type: String,
			}
		},
		data(){
			return{
				isActive: false,
				isValidated: false,
			}
		},
		created(){
			this.isActive = this.selected;
		}
	}
</script>
