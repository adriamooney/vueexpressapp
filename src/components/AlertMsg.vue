<template>
	<div>
		<div v-show="errors.showError" :class="errors.errorColor">{{errors.errorMsg}}</div>
    	<div v-show="success.showSuccess" :class="success.successColor">{{success.successMsg}}</div>
	</div>
</template>

<script>
export default {
     props: ['errors', 'success']
    //  data(){
    //     return{
    //       errors: {
    //         showError: false,
    //         errorMsg: '',
    //         errorColor: 'alert alert-danger'
    //       },
    //       success: {
    //         showSuccess: false,
    //         successMsg: '',
    //         successColor: 'alert alert-success'
    //       }
          
          
    //     }
    // }
}
</script>