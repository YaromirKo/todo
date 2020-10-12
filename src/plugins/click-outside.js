export default {
    /*
    * vue 3
    */
    beforeMount(el, binding) {
        el.clickOutsideEvent = function (event) {
            console.log(event.target)
            if (!el.contains(event.target) && el !== event.target) {
                // as we are attaching an click event listern to the document (below)
                // ensure the events target is outside the element or a child of it
                if (binding.instance.isOpen) {
                    binding.value(event); // before binding it
                }
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
        document.addEventListener('touchstart', el.clickOutsideEvent)
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
        document.removeEventListener('touchstart', el.clickOutsideEvent)

    }
}
