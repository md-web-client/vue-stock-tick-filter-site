import Vue from 'vue'
import Router from 'vue-router'
import Constants from './routes/Constants';
import Routes from './routes/'

Vue.use(Router);

Vue.prototype.$ROUTES = Constants;

const title = 'Assessment';

const r = new Router({
  mode : 'history',
  routes : Routes,
  afterEach : (to) => {
    document.title = `${to.meta.title} | ${title}`;
  },
});

r.afterEach((to, from) => {
  if(to.meta && to.meta.title){
    document.title = typeof to.meta.title === 'string' ? to.meta.title : to.meta.title(to);
  } else {
    document.title = title;
  }
  if(from.meta.body_class){
    document.body.classList.remove(from.meta.body_class);
  }
  if(to.meta.body_class){
    document.body.classList.add(to.meta.body_class);
  }
});

window.Router = r;

export default r;
