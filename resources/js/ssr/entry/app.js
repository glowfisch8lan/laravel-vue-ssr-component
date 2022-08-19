import Vue from 'vue';
import vueInit from '../../vue-init'

//todo Импортить app.js VUE
export default context => {
    const vue = vueInit(Vue, true)
    const component = vue.options.components[process.argv[2]]
    component.options.props.course_id = 16
    return new vue(component)
};
