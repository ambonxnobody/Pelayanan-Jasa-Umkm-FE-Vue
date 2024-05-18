<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal dialog-centered" role="dialog" aria-labelledby="modalTitle"
                aria-describedby="modalDescription">
                <header class="modal-header bg-primary  text-light" id="modalTitle">
                    <slot name="header">
                        This is the default title!
                    </slot>
                    <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
                </header>

                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        This is the default body!
                    </slot>
                </section>

                <footer class="modal-footer">
                    <slot name="footer">
                        This is the default footer!
                    </slot>
                    <button type="button" class="btn btn-green" @click="close" aria-label="Close modal">
                        Close Modal
                    </button>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'BaseModal',
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    width: 800px;
 
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
    max-height: 400px;
    overflow-y: auto;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .5s ease;
}
</style>
