<template>
    <div id="app-layout" class="app">

        <div class="primary-layout-con">

            <div class="primary-menu-con">
                <div class="menu-items">
                    <div class="logo-con">
                        <img src="../assets/image/logo.png" class="image">
                    </div>
                    <router-link
                        :to="{ name : $ROUTES.HOME }"
                        exact
                        class="item tooltip is-tooltip-right"
                        data-tooltip="Home"
                    >
                        <i class="fa fa-home"></i>
                    </router-link>
                    <router-link
                        :to="{ name : $ROUTES.SYMBOLS }"
                        exact
                        class="item tooltip is-tooltip-right"
                        data-tooltip="Symbols"
                    >
                        <i class="fa fa-tags"></i>
                    </router-link>
                </div>
            </div>

            <div class="primary-content-con" style="height:100%">

                <div class="primary-content">
                    <transition>
                        <router-view></router-view>
                    </transition>
                </div>

            </div>

        </div>


    </div>
</template>

<script>
export default {
  name : 'AppLayout',
}
</script>

<style scoped lang="scss">

    @import "../assets/css/_theme.scss";

    .primary-layout-con {

        width:100%;
        height:100%;
        display:block;
        position:relative;

        $menuWidth:64px;

        & > .primary-menu-con {
            width:$menuWidth;
            //background-color: #05202f;
            background-color: #2c2c2c;
            text-align:center;
            position:fixed;
            height:100vh;
            top:0;
            //keeps tooltips from getting hidden behind main page content
            z-index:1;

            .logo-con {
                margin:6px 0;
                img {
                    height:32px;
                    width:auto;
                    margin:0 auto;
                }
            }

            .item {
                display:block;
                width:100%;
                padding:15px 0;
                color:$white-bis;
                cursor:pointer;

                &.router-link-active,
                &router-link-exact-active {
                    border-left:2px solid $primary;
                }

                &.is-dashboard {
                    border-left:none;
                }

                &:hover {
                    background-color: $primary;
                }

                .fa {
                    font-size:24px;
                }
            }

        }

        & > .primary-content-con {

            margin-left:$menuWidth;
            width:calc(100% - #{$menuWidth});
            background-color:$white;

            .primary-content{
                height:100%;
                & > div {
                    height:100%;
                }
            }

        }

    }
</style>
