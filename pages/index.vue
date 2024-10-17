<template>
    <div>
        首页
    </div>
</template>
<style>
* {
    padding: 0;
    margin: 0;
    list-style: none
}

a {
    text-decoration: none;
    color: inherit
}

h1.title {
    width: 0;
    height: 0;
    opacity: 0
}

body {
    background-color: #F7F7F8
}

#page-tool.pagination {
    width: 100%;
    padding-top: 30px;
    box-sizing: border-box;
    background-color: white;
    padding-bottom: 10px
}

#page-tool.pagination li {
    border-radius: 2px !important
}

#page-tool.pagination li select,#page-tool.pagination li input,#page-tool.pagination li a {
    border-radius: 2px !important
}

.database-wrapper {
    width: 1200px;
    margin: auto;
    min-height: calc(100vh - 145px - 64px)
}

.database-wrapper canvas {
    max-width: none;
    max-height: none
}

.database-wrapper .database-container {
    width: 1200px;
    margin-bottom: 20px
}

.database-wrapper .database-container .breadcrumb {
    width: 1200px;
    height: 40px;
    border-radius: 0 0 5px 5px;
    line-height: 40px;
    font-size: 14px;
    color: #999;
    display: flex;
    background-color: white;
    box-sizing: border-box;
    padding-left: 25px
}

.database-wrapper .database-container .breadcrumb a {
    color: #de1e30;
    cursor: pointer
}

.database-wrapper .database-container .breadcrumb a:after {
    content: '>';
    margin: 0 10px;
    font-weight: bold
}

.database-wrapper .database-container .breadcrumb :last-child a {
    color: #999
}

.database-wrapper .database-container .breadcrumb :last-child a:after {
    content: none
}

.database-wrapper .database-container .main-area {
    margin-top: 15px;
    width: 1200px;
    display: flex
}

.database-wrapper .database-container .main-area .left-nav {
    width: 200px;
    margin-right: 10px
}

.database-wrapper .database-container .main-area .left-nav .catalog {
    width: 200px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07)
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper {
    width: 200px
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels {
    width: 200px;
    border-radius: 5px;
    background-color: white
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .area-title {
    height: 44px;
    cursor: pointer;
    border-bottom: 1px solid #F6F6F6;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .area-title .text {
    font-size: 14px;
    color: #DE1E31;
    float: left;
    margin-left: 20px;
    font-weight: bold
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .area-title .arrow {
    width: 21px;
    height: 21px;
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M434.944 790.624l-45.248-45.248L623.04 512 389.664 278.624l45.248-45.248L713.568 512z' fill='%23181818'/%3E%3C/svg%3E");
    background-size: cover;
    margin-right: 10px
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area.active .area-title .arrow {
    transform: rotateZ(90deg)
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area.active .country-levels {
    height: auto
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels {
    transition: 0.3s;
    height: 0;
    overflow: hidden
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .country-title {
    width: 200px;
    height: 35px;
    font-size: 12px;
    color: #333;
    cursor: pointer;
    border-bottom: 1px solid #F6F6F6;
    display: flex;
    align-items: center
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .country-title .check {
    width: 12px;
    height: 12px;
    margin-left: 10px;
    margin-right: 8px;
    position: relative
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .country-title .check::before {
    content: '';
    position: absolute;
    background-color: #c6c6c6;
    width: 100%;
    height: 2px;
    left: 0;
    top: 5px
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .country-title .check::after {
    content: '';
    position: absolute;
    background-color: #c6c6c6;
    width: 2px;
    height: 100%;
    top: 0;
    left: 5px
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .country-title .logo {
    width: 14px;
    height: 14px;
    margin: 0 3px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country.active .country-title .check::after {
    width: 2px;
    height: 0
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country.active .competition-levels {
    height: auto
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels {
    transition: 0.3s;
    height: 0;
    overflow: hidden
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition {
    height: 30px;
    width: 200px;
    border-bottom: 1px solid #F6F6F6;
    transition: .3s;
    position: relative
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition:hover {
    background-color: #FFF7F8
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition:hover .collection {
    color: #bababa
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition .link {
    height: 30px;
    display: flex;
    align-items: center;
    color: #999;
    font-size: 12px;
    margin-left: 45px
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition .tip {
    height: 30px;
    display: flex;
    align-items: center;
    color: #999;
    font-size: 12px;
    justify-content: center
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition .collection {
    width: 20px;
    height: 20px;
    color: transparent;
    transition: .3s;
    position: absolute;
    right: 8px;
    top: 5px
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition .collection:hover {
    color: #ffd430
}

.database-wrapper .database-container .main-area .left-nav .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition .collection.active {
    color: #ffd430
}

.database-wrapper .database-container .main-area .right-data {
    width: 990px;
    align-self: start
}

.database-wrapper .database-container .main-area .right-data .match-introd {
    width: 990px;
    padding: 20px 30px;
    box-sizing: border-box;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07)
}

.database-wrapper .database-container .main-area .right-data .match-introd .title {
    display: flex;
    color: #666;
    position: relative;
    justify-content: space-between
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .composition-base-info {
    display: flex
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .composition-base-info .competition-logo {
    width: 56px;
    height: 56px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 30px;
    overflow: hidden
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .composition-base-info .competition-logo img {
    max-width: 56px;
    max-height: 56px
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .composition-base-info .competition-name .top {
    font-size: 24px
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .composition-base-info .competition-name .bottom {
    font-size: 18px
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects {
    display: flex;
    flex: auto;
    justify-content: flex-end
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select {
    height: 28px;
    padding-left: 10px
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box {
    border-radius: 17px;
    border: 1px solid #ddd;
    min-height: 28px;
    box-sizing: border-box;
    position: relative;
    background-color: white
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box .current {
    padding-left: 10px;
    padding-right: 26px;
    box-sizing: border-box;
    text-align: center;
    height: 28px;
    position: absolute;
    line-height: 28px;
    width: 100%;
    z-index: 2;
    color: #666;
    line-height: 28px;
    font-size: 12px;
    border-radius: 17px 17px 0 0
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box .current * {
    text-align: center;
    height: 28px;
    color: #666;
    line-height: 28px;
    font-size: 12px;
    text-decoration: none
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box .arrow {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 14px;
    top: 8px;
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M512 685.248L233.376 406.624l45.248-45.248L512 594.752l233.376-233.376 45.248 45.248z' fill='%23181818'/%3E%3C/svg%3E");
    background-size: cover
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box:hover {
    z-index: 5
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box:hover .down ul {
    height: auto
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box .down ul {
    height: 0px;
    max-height: 374px;
    overflow: auto;
    position: relative;
    top: 28px;
    margin-bottom: 28px;
    border-radius: 0 0 17px 17px;
    transition: .1s;
    transform-style: preserve-3d;
    background-color: #fff
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box .down ul::-webkit-scrollbar {
    display: block;
    width: 0px;
    height: 0px;
    background-color: #F5F5F5
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box .down ul li {
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
    color: #666;
    line-height: 28px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    cursor: pointer
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box .down ul li:hover {
    background-color: #f3f3f4
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box .down ul li.active {
    background-color: #f3f3f4
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box .down ul li.remove {
    display: none
}

.database-wrapper .database-container .main-area .right-data .match-introd .title .selects .select .select-box .down ul li a {
    text-decoration: none;
    color: #666
}

.database-wrapper .database-container .main-area .right-data .match-introd .info {
    display: flex;
    height: 39px
}

.database-wrapper .database-container .main-area .right-data .match-introd .info div {
    min-width: 120px;
    font-size: 14px;
    color: #666;
    margin: 20px 15px 0 0
}

.database-wrapper .database-container .main-area .right-data .table-related {
    width: 990px;
    height: 74px;
    position: relative;
    border-radius: 4px 4px 0 0
}

.database-wrapper .database-container .main-area .right-data .table-related.fixed .nav-wrapper {
    position: fixed;
    top: 64px;
    z-index: 10
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper {
    width: 990px;
    height: 73px;
    border-top: 1px solid transparent;
    background-color: white;
    border-radius: 4px 4px 0 0
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head {
    box-sizing: border-box;
    padding: 0 10px;
    margin: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #F0F0F0
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .tabs {
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .tabs .tab {
    font-size: 14px;
    flex: none;
    width: 84px;
    height: 44px;
    background: #F0F0F0;
    color: #333;
    line-height: 44px;
    text-align: center;
    cursor: pointer
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .tabs .tab.active {
    color: #E74C5B;
    box-shadow: 0px -2px 0px 0px #E74C5B inset
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select {
    height: 28px;
    padding-left: 10px
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box {
    border-radius: 17px;
    border: 1px solid #ddd;
    min-height: 28px;
    box-sizing: border-box;
    position: relative;
    background-color: white
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box .current {
    padding-left: 10px;
    padding-right: 26px;
    box-sizing: border-box;
    text-align: center;
    height: 28px;
    position: absolute;
    line-height: 28px;
    width: 100%;
    z-index: 2;
    color: #666;
    line-height: 28px;
    font-size: 12px;
    border-radius: 17px 17px 0 0
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box .current * {
    text-align: center;
    height: 28px;
    color: #666;
    line-height: 28px;
    font-size: 12px;
    text-decoration: none
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box .arrow {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 14px;
    top: 8px;
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M512 685.248L233.376 406.624l45.248-45.248L512 594.752l233.376-233.376 45.248 45.248z' fill='%23181818'/%3E%3C/svg%3E");
    background-size: cover
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box:hover {
    z-index: 5
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box:hover .down ul {
    height: auto
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box .down ul {
    height: 0px;
    max-height: 374px;
    overflow: auto;
    position: relative;
    top: 28px;
    margin-bottom: 28px;
    border-radius: 0 0 17px 17px;
    transition: .1s;
    transform-style: preserve-3d;
    background-color: #fff
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box .down ul::-webkit-scrollbar {
    display: block;
    width: 0px;
    height: 0px;
    background-color: #F5F5F5
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box .down ul li {
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
    color: #666;
    line-height: 28px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    cursor: pointer
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box .down ul li:hover {
    background-color: #f3f3f4
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box .down ul li.active {
    background-color: #f3f3f4
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box .down ul li.remove {
    display: none
}

.database-wrapper .database-container .main-area .right-data .table-related .nav-wrapper .table-head .select .select-box .down ul li a {
    text-decoration: none;
    color: #666
}

.database-wrapper .database-container .main-area .right-data .table-show {
    background-color: white;
    padding-bottom: 15px;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07)
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type {
    margin: 0 15px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .stage {
    display: flex;
    flex-wrap: wrap
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .stage .stage_name {
    width: 140px;
    height: 28px;
    border-radius: 14px;
    border: 1px solid #D8D8D8;
    font-size: 12px;
    line-height: 28px;
    border-radius: 18px;
    color: #666;
    cursor: pointer;
    text-align: center;
    overflow: hidden;
    position: relative;
    transition: 0.6s;
    margin-right: 15px;
    margin-bottom: 15px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .stage .stage_name.active {
    border: 1px solid #E74C5B;
    color: #E74C5B
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .stage .stage_name::before {
    content: '';
    transition: 0.6s;
    transform-style: preserve-3d;
    transform: rotate(30deg);
    background-color: rgba(255,255,255,0.8);
    background-color: rgba(255,255,255,0.8);
    width: 20px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: -30px;
    margin-top: -25px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .stage .stage_name:hover {
    color: #fff;
    border-color: #F33E4F;
    background-color: #F33E4F
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .stage .stage_name:hover::before {
    left: 300px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .rounds {
    width: 100%
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .rounds .wrapper {
    flex-wrap: wrap;
    margin-bottom: 15px;
    display: none
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .rounds .wrapper.active {
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .rounds .wrapper .round {
    flex: none;
    width: 7.14%;
    height: 28px;
    text-align: center;
    line-height: 28px;
    color: #666;
    background-color: #f7f7f7;
    font-size: 14px;
    transition: 0.3s;
    border-right: 2px white solid;
    border-bottom: 2px white solid;
    cursor: pointer
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .rounds .wrapper .round.nostart {
    color: #de1e31
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .rounds .wrapper .round:hover {
    background-color: #de1e31;
    color: white
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .rounds .wrapper .round.active {
    background-color: #de1e31;
    color: white
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups {
    width: 100%;
    height: 28px;
    margin-bottom: 15px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper {
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper div:first-child {
    border-radius: 14px 0 0 14px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper div:last-child {
    border-radius: 0 14px 14px 0
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .group {
    flex: 1;
    margin-right: 1px;
    font-size: 12px;
    color: #666;
    text-align: center;
    line-height: 28px;
    background-color: #f0f0f0;
    cursor: pointer;
    position: relative
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .group.active {
    color: #fff;
    background-color: #F33E4F
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .round {
    width: 100px;
    margin-right: 1px;
    font-size: 12px;
    color: #666;
    text-align: center;
    line-height: 28px;
    background-color: #f0f0f0;
    cursor: pointer;
    position: relative
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .round.active {
    color: #fff;
    background-color: #F33E4F
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .group-anima {
    position: relative
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .group-anima .text {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 28px;
    z-index: 1;
    transition: 0.3s
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .group-anima::before {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    content: "";
    height: 0;
    transition: 0.3s;
    background-color: #F33E4F;
    transform-origin: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .group-anima::after {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    content: "";
    height: 0;
    transition: 0.3s;
    background-color: #F33E4F;
    transform-origin: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .group-anima:hover .text {
    color: #fff
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .group-anima:hover::before {
    height: 17px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .groups .wrapper .group-anima:hover::after {
    height: 17px;
    top: -6%
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match {
    padding-top: 8px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .title {
    font-size: 14px;
    color: #666;
    padding: 8px 0
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data {
    padding-top: 8px;
    overflow: hidden
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table {
    flex: none;
    width: 100%;
    padding-top: 8px;
    position: relative;
    z-index: 1;
    border-bottom: 1px solid #E8E8E8;
    border-left: 1px solid #E8E8E8;
    table-layout: fixed
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead {
    height: 44px;
    position: relative;
    z-index: 1
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th {
    font-size: 12px;
    height: 44px;
    color: #666666;
    background-clip: padding-box;
    border-right: 1px solid #E8E8E8;
    border-top: 1px solid #E8E8E8;
    position: relative;
    font-weight: normal
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th::before {
    content: "";
    width: 100%;
    height: 8px;
    background-color: #717390;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%)
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lan,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lv {
    padding: 0;
    width: 150px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lan .play,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lv .play {
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lan .chang,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lv .chang {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lan .chang>span,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lv .chang>span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-right: 1px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lan .chang>span:first-child,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lv .chang>span:first-child {
    margin-right: 1px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lan .chang>span {
    background-color: #4AA0FF
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lan::before {
    background-color: #4AA0FF
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lv .chang>span {
    background-color: #54C975
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.lv::before {
    background-color: #54C975
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.team {
    width: 125px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.w150 {
    width: 150px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.w130 {
    width: 130px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.sort {
    position: relative
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.sort::after {
    content: '';
    border: 5px solid transparent;
    border-top-color: #666;
    position: absolute;
    top: 18px;
    right: 5px;
    transition: 0.3s;
    transform: rotateX(0deg);
    transform-origin: center 25%
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table thead tr th.sort.active::after {
    transform: rotateX(180deg)
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody {
    width: 827px;
    text-align: center;
    overflow: hidden
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.total {
    height: 45px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.total td {
    border-top: 1px solid #E8E8E8;
    font-size: 12px;
    color: #333;
    font-weight: 500;
    background-color: #ECF0F8
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.total td.t1 {
    text-align: right;
    font-weight: normal
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.total td.t2 {
    text-align: left;
    font-weight: normal
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.total td.score {
    font-weight: bold;
    color: #333
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.total td.score .red {
    color: #de1e30
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.total td .td_ca {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 0;
    flex-direction: row
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.match_data {
    height: 39px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.match_data td {
    height: 34px;
    border-right: 1px solid #E8E8E8;
    border-top: 1px solid #E8E8E8;
    position: relative;
    font-size: 12px;
    color: #666
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.match_data td:hover::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 10000px;
    left: 0;
    top: -5000px;
    background-color: #EEEEF0;
    z-index: -1
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.match_data td.light_gray::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #F8F8FC;
    z-index: -2
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.match_data td.ca {
    line-height: 0
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.match_data td .v_center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.match_data td .td_ca {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.match_data:hover td {
    background-color: #E8E8E8 !important
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.note {
    height: 32px;
    font-size: 12px;
    color: #666;
    background-color: #f7f7f8;
    text-align: left;
    border-top: 1px solid #E8E8E8;
    border-right: 1px solid #E8E8E8
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data table tbody tr.note td {
    padding-left: 10px;
    box-sizing: border-box
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.data .empty {
    font-size: 16px;
    color: #bbb;
    height: 250px;
    border: 1px solid #E8E8E8;
    box-sizing: border-box;
    border-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match {
    padding-top: 8px;
    overflow: hidden
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table {
    flex: none;
    width: 100%;
    padding-top: 8px;
    position: relative;
    z-index: 1;
    border-bottom: 1px solid #E8E8E8;
    border-left: 1px solid #E8E8E8;
    table-layout: fixed
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead {
    height: 44px;
    position: relative;
    z-index: 1
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th {
    font-size: 12px;
    height: 44px;
    color: #666666;
    background-clip: padding-box;
    border-right: 1px solid #E8E8E8;
    border-top: 1px solid #E8E8E8;
    position: relative;
    font-weight: normal
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th::before {
    content: "";
    width: 100%;
    height: 8px;
    background-color: #717390;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%)
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lan,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lv {
    padding: 0;
    width: 150px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lan .play,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lv .play {
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lan .chang,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lv .chang {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lan .chang>span,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lv .chang>span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-right: 1px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lan .chang>span:first-child,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lv .chang>span:first-child {
    margin-right: 1px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lan .chang>span {
    background-color: #4AA0FF
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lan::before {
    background-color: #4AA0FF
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lv .chang>span {
    background-color: #54C975
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.lv::before {
    background-color: #54C975
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.team {
    width: 125px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.w150 {
    width: 150px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.w130 {
    width: 130px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.sort {
    position: relative
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.sort::after {
    content: '';
    border: 5px solid transparent;
    border-top-color: #666;
    position: absolute;
    top: 18px;
    right: 5px;
    transition: 0.3s;
    transform: rotateX(0deg);
    transform-origin: center 25%
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table thead tr th.sort.active::after {
    transform: rotateX(180deg)
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody {
    width: 827px;
    text-align: center;
    overflow: hidden
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.total {
    height: 45px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.total td {
    border-top: 1px solid #E8E8E8;
    font-size: 12px;
    color: #333;
    font-weight: 500;
    background-color: #ECF0F8
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.total td.t1 {
    text-align: right;
    font-weight: normal
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.total td.t2 {
    text-align: left;
    font-weight: normal
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.total td.score {
    font-weight: bold;
    color: #333
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.total td.score .red {
    color: #de1e30
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.total td .td_ca {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 0;
    flex-direction: row
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.match_data {
    height: 39px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.match_data td {
    height: 34px;
    border-right: 1px solid #E8E8E8;
    border-top: 1px solid #E8E8E8;
    position: relative;
    font-size: 12px;
    color: #666
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.match_data td.light_gray::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #F8F8FC;
    z-index: -2
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.match_data td.ca {
    line-height: 0
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.match_data td .v_center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.match_data td .td_ca {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.match_data:hover td {
    background-color: #E8E8E8 !important
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.note {
    height: 32px;
    font-size: 12px;
    color: #666;
    background-color: #f7f7f8;
    text-align: left;
    border-top: 1px solid #E8E8E8;
    border-right: 1px solid #E8E8E8
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr.note td {
    padding-left: 10px;
    box-sizing: border-box
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match .empty {
    font-size: 16px;
    color: #bbb;
    height: 250px;
    border: 1px solid #E8E8E8;
    box-sizing: border-box;
    border-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table {
    width: 100%
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .time {
    line-height: 17px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .score .link {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 0
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .score .link .whole_score {
    color: #666;
    cursor: pointer;
    height: 16px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .score .link .half_score {
    color: #bbb;
    cursor: pointer;
    height: 16px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .score .link .no-score {
    color: #666;
    cursor: pointer
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .home .link,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .away .link {
    color: #de1e31;
    cursor: pointer
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .home .link:hover,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .away .link:hover {
    color: #e30c0c
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .odd-asian .odd-wrapper,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .odd-europe .odd-wrapper {
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .odd-asian .odd-wrapper>div,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .odd-europe .odd-wrapper>div {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .data {
    white-space: nowrap
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .data a {
    margin: 0 6px;
    color: #de1e31;
    cursor: pointer
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .match-table-type .table-match .table-wrapper.match table tbody tr .data a:hover {
    color: #e30c0c
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type {
    margin: 0 15px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .stage {
    display: flex;
    flex-wrap: wrap
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .stage .stage_name {
    width: 140px;
    height: 28px;
    border-radius: 14px;
    border: 1px solid #D8D8D8;
    font-size: 12px;
    line-height: 28px;
    border-radius: 18px;
    color: #666;
    cursor: pointer;
    text-align: center;
    overflow: hidden;
    position: relative;
    transition: 0.6s;
    margin-right: 15px;
    margin-bottom: 15px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .stage .stage_name.active {
    border: 1px solid #E74C5B;
    color: #E74C5B
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .stage .stage_name::before {
    content: '';
    transition: 0.6s;
    transform-style: preserve-3d;
    transform: rotate(30deg);
    background-color: rgba(255,255,255,0.8);
    background-color: rgba(255,255,255,0.8);
    width: 20px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: -30px;
    margin-top: -25px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .stage .stage_name:hover {
    color: #fff;
    border-color: #F33E4F;
    background-color: #F33E4F
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .stage .stage_name:hover::before {
    left: 300px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .rounds {
    width: 100%
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .rounds .wrapper {
    flex-wrap: wrap;
    margin-bottom: 15px;
    display: none
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .rounds .wrapper.active {
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .rounds .wrapper .round {
    flex: none;
    width: 7.14%;
    height: 28px;
    text-align: center;
    line-height: 28px;
    color: #666;
    background-color: #f7f7f7;
    font-size: 14px;
    transition: 0.3s;
    border-right: 2px white solid;
    border-bottom: 2px white solid;
    cursor: pointer
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .rounds .wrapper .round.nostart {
    color: #de1e31
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .rounds .wrapper .round:hover {
    background-color: #de1e31;
    color: white
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .rounds .wrapper .round.active {
    background-color: #de1e31;
    color: white
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups {
    width: 100%;
    height: 28px;
    margin-bottom: 15px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper {
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper div:first-child {
    border-radius: 14px 0 0 14px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper div:last-child {
    border-radius: 0 14px 14px 0
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper .group {
    flex: 1;
    margin-right: 1px;
    font-size: 12px;
    color: #666;
    text-align: center;
    line-height: 28px;
    background-color: #f0f0f0;
    cursor: pointer;
    position: relative
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper .group.active {
    color: #fff;
    background-color: #F33E4F
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper .group-anima {
    position: relative
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper .group-anima .text {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 28px;
    z-index: 1;
    transition: 0.3s
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper .group-anima::before {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    content: "";
    height: 0;
    transition: 0.3s;
    background-color: #F33E4F;
    transform-origin: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper .group-anima::after {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    content: "";
    height: 0;
    transition: 0.3s;
    background-color: #F33E4F;
    transform-origin: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper .group-anima:hover .text {
    color: #fff
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper .group-anima:hover::before {
    height: 17px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .groups .wrapper .group-anima:hover::after {
    height: 17px;
    top: -6%
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper {
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .slider {
    flex: none;
    width: 143px;
    background-color: #F7F7F7
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .slider .tab {
    height: 44px;
    font-size: 12px;
    color: #666;
    line-height: 45px;
    text-align: center;
    position: relative;
    cursor: pointer
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .slider .tab:first-child {
    box-shadow: inset 0px 1px 1px 0px #F0F0F0
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .slider .tab.active {
    color: #E74C5B;
    background-color: white
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .slider .tab.active::before {
    width: 4px;
    height: 16px;
    content: '';
    display: block;
    position: absolute;
    background-color: #E84B5B;
    border-radius: 1px;
    top: 14px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right {
    flex: auto
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .title {
    font-size: 14px;
    color: #666;
    padding: 8px 0
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper {
    overflow: hidden;
    padding-top: 8px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table {
    flex: none;
    width: 100%;
    padding-top: 8px;
    position: relative;
    z-index: 1;
    border-bottom: 1px solid #E8E8E8;
    border-left: 1px solid #E8E8E8;
    table-layout: fixed
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead {
    height: 44px;
    position: relative;
    z-index: 1
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th {
    font-size: 12px;
    height: 44px;
    color: #666666;
    background-clip: padding-box;
    border-right: 1px solid #E8E8E8;
    border-top: 1px solid #E8E8E8;
    position: relative;
    font-weight: normal
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th::before {
    content: "";
    width: 100%;
    height: 8px;
    background-color: #717390;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%)
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lan,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lv {
    padding: 0;
    width: 150px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lan .play,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lv .play {
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lan .chang,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lv .chang {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lan .chang>span,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lv .chang>span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-right: 1px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lan .chang>span:first-child,.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lv .chang>span:first-child {
    margin-right: 1px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lan .chang>span {
    background-color: #4AA0FF
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lan::before {
    background-color: #4AA0FF
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lv .chang>span {
    background-color: #54C975
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.lv::before {
    background-color: #54C975
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.team {
    width: 125px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.w150 {
    width: 150px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.w130 {
    width: 130px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.sort {
    position: relative
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.sort::after {
    content: '';
    border: 5px solid transparent;
    border-top-color: #666;
    position: absolute;
    top: 18px;
    right: 5px;
    transition: 0.3s;
    transform: rotateX(0deg);
    transform-origin: center 25%
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table thead tr th.sort.active::after {
    transform: rotateX(180deg)
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody {
    width: 827px;
    text-align: center;
    overflow: hidden
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.total {
    height: 45px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.total td {
    border-top: 1px solid #E8E8E8;
    font-size: 12px;
    color: #333;
    font-weight: 500;
    background-color: #ECF0F8
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.total td.t1 {
    text-align: right;
    font-weight: normal
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.total td.t2 {
    text-align: left;
    font-weight: normal
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.total td.score {
    font-weight: bold;
    color: #333
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.total td.score .red {
    color: #de1e30
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.total td .td_ca {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 0;
    flex-direction: row
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.match_data {
    height: 39px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.match_data td {
    height: 34px;
    border-right: 1px solid #E8E8E8;
    border-top: 1px solid #E8E8E8;
    position: relative;
    font-size: 12px;
    color: #666
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.match_data td:hover::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 10000px;
    left: 0;
    top: -5000px;
    background-color: #EEEEF0;
    z-index: -1
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.match_data td.light_gray::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #F8F8FC;
    z-index: -2
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.match_data td.ca {
    line-height: 0
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.match_data td .v_center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.match_data td .td_ca {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.match_data:hover td {
    background-color: #E8E8E8 !important
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.note {
    height: 32px;
    font-size: 12px;
    color: #666;
    background-color: #f7f7f8;
    text-align: left;
    border-top: 1px solid #E8E8E8;
    border-right: 1px solid #E8E8E8
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr.note td {
    padding-left: 10px;
    box-sizing: border-box
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper .empty {
    font-size: 16px;
    color: #bbb;
    height: 250px;
    border: 1px solid #E8E8E8;
    box-sizing: border-box;
    border-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .team {
    width: 120px;
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .team .team-wrapper {
    display: flex;
    align-items: center;
    color: #666
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .team .team-wrapper .team-logo {
    flex: none;
    width: 18px;
    height: 18px;
    margin-right: 5px;
    background-position: center;
    background-repeat: no-repeat
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .team .team-wrapper .team-name {
    color: #de1e31
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .play-rank {
    width: 101px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .play-player {
    width: 229px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .play-player .player-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .play-player .player-wrapper .player-icon {
    width: 16px;
    height: 18px;
    margin-right: 10px;
    margin-left: 44px;
    background-repeat: no-repeat;
    background-position: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .play-player .player-wrapper .name {
    font-size: 12px;
    color: #de1e31
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .play-team {
    width: 291px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .play-team .team-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .play-team .team-wrapper .team-icon {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    margin-left: 44px;
    background-repeat: no-repeat;
    background-position: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .play-team .team-wrapper .name {
    font-size: 12px;
    color: #de1e31
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .team-rank {
    width: 101px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .team-team {
    width: 514px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .team-team .team-wrapper {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .team-team .team-wrapper .team-icon {
    width: 18px;
    height: 18px;
    margin-right: 11px;
    margin-left: 104px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .team-team .team-wrapper .name {
    font-size: 12px;
    color: #666666
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .position .circle-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .table-wrapper table tbody tr .position .circle-wrapper .circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .slider-type .select_wrapper .right .empty {
    height: 250px;
    border: 1px solid #E8E8E8;
    box-sizing: border-box;
    font-size: 16px;
    color: #bbb;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .comp_intro {
    font-size: 12px;
    color: #666;
    padding-top: 15px;
    margin: 0 20px;
    line-height: 22px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .legend {
    display: flex;
    margin: 18px 20px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .legend .promotion {
    display: flex;
    align-items: center;
    margin-right: 10px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .legend .promotion .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .data-wrapper .legend .promotion .text {
    font-size: 12px;
    color: #666
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .news-wrapper {
    margin-top: -20px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .news-wrapper .news_list {
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .news-wrapper .news_list .new_item {
    flex: none;
    width: calc(50% - 20px);
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-right: 15px;
    position: relative;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #EEEEEE
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .news-wrapper .news_list .new_item .cover {
    width: 192px;
    height: 108px;
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 2px;
    overflow: hidden;
    transition: 0.3s
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .news-wrapper .news_list .new_item .cover:hover {
    transform: scale(1.05)
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .news-wrapper .news_list .new_item .text {
    width: 252px;
    display: flex;
    flex-direction: column;
    justify-content: space-between
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .news-wrapper .news_list .new_item .text .title {
    width: 252px;
    font-size: 18px;
    font-weight: 400;
    color: #333333;
    line-height: 25px;
    transition: .3s;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .news-wrapper .news_list .new_item .text .title:hover {
    color: #E74C5B
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .news-wrapper .news_list .new_item .text .time {
    height: 17px;
    margin-bottom: 3px;
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 17px
}

.database-wrapper .database-container .main-area .right-data .table-show .table-show-wrapper .news-wrapper .empty {
    width: 100%;
    height: 450px;
    color: #bbb;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .main-area .right-data .empty {
    width: 100%;
    height: 450px;
    color: #bbb;
    display: flex;
    justify-content: center;
    align-items: center
}

.separator {

}

* {
    padding: 0;
    margin: 0;
    list-style: none
}

a {
    text-decoration: none;
    color: inherit
}

h1.title {
    width: 0;
    height: 0;
    opacity: 0
}

body {
    background-color: #F7F7F8
}

.database-wrapper {
    margin: auto;
    width: 1200px;
    margin-bottom: 20px
}

.database-wrapper .breadcrumb {
    width: 1200px;
    height: 40px;
    border-radius: 0 0 5px 5px;
    line-height: 40px;
    font-size: 14px;
    color: #999;
    display: flex;
    background-color: white;
    box-sizing: border-box;
    padding-left: 25px
}

.database-wrapper .breadcrumb a {
    color: #de1e30;
    cursor: pointer
}

.database-wrapper .breadcrumb a:after {
    content: '>';
    margin: 0 10px;
    font-weight: bold
}

.database-wrapper .breadcrumb :last-child a {
    color: #999
}

.database-wrapper .breadcrumb :last-child a:after {
    content: none
}

.database-wrapper .database-container {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start
}

.database-wrapper .database-container .left {
    width: 200px
}

.database-wrapper .database-container .left .catalog {
    width: 200px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07)
}

.database-wrapper .database-container .left .catalog .catalog-wrapper {
    width: 200px
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels {
    width: 200px;
    border-radius: 5px;
    background-color: white
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .area-title {
    height: 44px;
    cursor: pointer;
    border-bottom: 1px solid #F6F6F6;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .area-title .text {
    font-size: 14px;
    color: #DE1E31;
    float: left;
    margin-left: 20px;
    font-weight: bold
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .area-title .arrow {
    width: 21px;
    height: 21px;
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M434.944 790.624l-45.248-45.248L623.04 512 389.664 278.624l45.248-45.248L713.568 512z' fill='%23181818'/%3E%3C/svg%3E");
    background-size: cover;
    margin-right: 10px
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area.active .area-title .arrow {
    transform: rotateZ(90deg)
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area.active .country-levels {
    height: auto
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels {
    transition: 0.3s;
    height: 0;
    overflow: hidden
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .country-title {
    width: 200px;
    height: 35px;
    font-size: 12px;
    color: #333;
    cursor: pointer;
    border-bottom: 1px solid #F6F6F6;
    display: flex;
    align-items: center
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .country-title .check {
    width: 12px;
    height: 12px;
    margin-left: 10px;
    margin-right: 8px;
    position: relative
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .country-title .check::before {
    content: '';
    position: absolute;
    background-color: #c6c6c6;
    width: 100%;
    height: 2px;
    left: 0;
    top: 5px
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .country-title .check::after {
    content: '';
    position: absolute;
    background-color: #c6c6c6;
    width: 2px;
    height: 100%;
    top: 0;
    left: 5px
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .country-title .logo {
    width: 14px;
    height: 14px;
    margin: 0 3px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country.active .country-title .check::after {
    width: 2px;
    height: 0
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country.active .competition-levels {
    height: auto
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels {
    transition: 0.3s;
    height: 0;
    overflow: hidden
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition {
    height: 30px;
    width: 200px;
    border-bottom: 1px solid #F6F6F6;
    transition: .3s;
    position: relative
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition:hover {
    background-color: #FFF7F8
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition:hover .collection {
    color: #bababa
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition .link {
    height: 30px;
    display: flex;
    align-items: center;
    color: #999;
    font-size: 12px;
    margin-left: 45px
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition .tip {
    height: 30px;
    display: flex;
    align-items: center;
    color: #999;
    font-size: 12px;
    justify-content: center
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition .collection {
    width: 20px;
    height: 20px;
    color: transparent;
    transition: .3s;
    position: absolute;
    right: 8px;
    top: 5px
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition .collection:hover {
    color: #ffd430
}

.database-wrapper .database-container .left .catalog .catalog-wrapper .area-levels .area .country-levels .country .competition-levels .competition .collection.active {
    color: #ffd430
}

.database-wrapper .database-container .right {
    width: 990px
}

.database-wrapper .database-container .right .search {
    width: 990px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07);
    box-sizing: border-box;
    padding: 30px 90px 30px 30px;
    margin-bottom: 15px;
    border-radius: 4px;
    background-color: white;
    transition: 0.3s
}

.database-wrapper .database-container .right .search .search-box {
    width: 870px;
    height: 60px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    border: 1px solid #eee;
    box-shadow: 0 6px 10px 0 rgba(235,235,235,0.5)
}

.database-wrapper .database-container .right .search .search-box .search-ico {
    flex: none;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 24px;
    color: #999;
    font-weight: 100
}

.database-wrapper .database-container .right .search .search-box input.text {
    background-color: transparent;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    border: 0;
    outline: none;
    color: #bbb;
    line-height: 16px;
    text-align: start;
    cursor: text;
    font: 400 14px Arial
}

.database-wrapper .database-container .right .search .search-box input.text::placeholder {
    color: #bbb
}

.database-wrapper .database-container .right .search .search-box .search-btn {
    width: 85px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 85px;
    height: 40px;
    background: #FCBD30;
    border-radius: 2px;
    font-size: 16px;
    cursor: pointer;
    color: #FFFFFF;
    transition: 0.3s
}

.database-wrapper .database-container .right .search .search-box .search-btn:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.3)
}

@keyframes search {
    100% {
        transform: translateY(0);
        opacity: 1
    }
}

.database-wrapper .database-container .right .search .search-history {
    transition: 0.5s;
    transform: translateY(20px);
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    margin-left: 1px
}

.database-wrapper .database-container .right .search .search-history.active {
    max-height: 350px;
    animation: search 0.6s ease-in-out 0.1s 1 normal forwards
}

.database-wrapper .database-container .right .search .search-history .title {
    margin-top: 20px;
    display: flex;
    justify-content: space-between
}

.database-wrapper .database-container .right .search .search-history .title .text {
    font-size: 16px;
    color: #666
}

.database-wrapper .database-container .right .search .search-history .title .clear {
    font-size: 14px;
    color: #999;
    cursor: pointer
}

.database-wrapper .database-container .right .search .search-history .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap
}

.database-wrapper .database-container .right .search .search-history .list .link {
    margin: 10px 10px 0 0;
    display: flex
}

.database-wrapper .database-container .right .search .search-history .list .link:hover i.iconfont {
    transform: scale(0.9)
}

.database-wrapper .database-container .right .search .search-history .list .link a {
    font-size: 14px;
    color: #999;
    padding-right: 2px
}

.database-wrapper .database-container .right .search .search-history .list .link i.iconfont {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3px;
    transition: 0.3s;
    transform: scale(0);
    width: 14px;
    height: 14px;
    color: #bbb
}

.database-wrapper .database-container .right .search .search-history .list .link i.iconfont:hover {
    color: #666
}

.database-wrapper .database-container .right .recent-comps {
    width: 990px;
    background-color: white;
    margin-bottom: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07)
}

.database-wrapper .database-container .right .recent-comps .title {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end
}

.database-wrapper .database-container .right .recent-comps .title .part-title {
    height: 36px;
    display: flex;
    align-items: flex-end;
    margin-left: 0
}

.database-wrapper .database-container .right .recent-comps .title .part-title .red-line {
    width: 4px;
    height: 16px;
    background-color: #DE1E31;
    margin-left: 20px;
    margin-right: 10px;
    margin-bottom: 2px
}

.database-wrapper .database-container .right .recent-comps .title .part-title .text {
    height: 56px;
    display: flex;
    align-items: flex-end;
    font-size: 16px;
    font-weight: 600;
    color: #333333
}

.database-wrapper .database-container .right .recent-comps .title .checkout_btn {
    margin-right: 20px;
    display: flex
}

.database-wrapper .database-container .right .recent-comps .title .checkout_btn .football,.database-wrapper .database-container .right .recent-comps .title .checkout_btn .basketball {
    cursor: pointer;
    width: 77px;
    display: flex;
    align-items: center
}

.database-wrapper .database-container .right .recent-comps .title .checkout_btn .football .logo,.database-wrapper .database-container .right .recent-comps .title .checkout_btn .basketball .logo {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background-size: contain;
    background-repeat: no-repeat
}

.database-wrapper .database-container .right .recent-comps .title .checkout_btn .football .text,.database-wrapper .database-container .right .recent-comps .title .checkout_btn .basketball .text {
    height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 22px
}

.database-wrapper .database-container .right .recent-comps .title .checkout_btn .football.active .text,.database-wrapper .database-container .right .recent-comps .title .checkout_btn .basketball.active .text {
    color: #E74C5B
}

.database-wrapper .database-container .right .recent-comps .title .checkout_btn .basketball {
    justify-content: flex-end
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper {
    box-sizing: border-box;
    min-height: 169px;
    width: 990px;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 10px
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container {
    width: 960px;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: visible
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container .swiper-slide {
    width: 900px;
    height: 100%;
    display: flex
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container .swiper-button-prev {
    left: 939px;
    top: 30px;
    transition: 0.3s;
    position: relative
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container .swiper-button-prev::before {
    content: "";
    width: 12px;
    height: 1px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    background-color: #E5E5E5
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container .swiper-button-next {
    right: -10px;
    top: 105px;
    transition: 0.3s
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container .swiper-button {
    position: absolute;
    width: 30px;
    height: 75px;
    outline: none;
    background-color: white;
    border-left: 1px solid #f3f3f3;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container .swiper-button:after {
    display: none
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container .swiper-button i {
    width: 21px;
    height: 26px;
    font-size: 23px;
    color: #666;
    transition: 0.1s
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container .swiper-button:hover i {
    color: #222
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container .swiper-button-disabled {
    opacity: 1;
    pointer-events: auto
}

.database-wrapper .database-container .right .recent-comps .comp-wrapper .swiper-container .swiper-button-disabled i {
    color: #bbb
}

.database-wrapper .database-container .right .recent-comps .ss .comp {
    background-color: lightcoral
}

.database-wrapper .database-container .right .recent-comps .comp {
    width: 90px;
    min-height: 169px;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-right: 10px
}

.database-wrapper .database-container .right .recent-comps .comp .comp-wapper {
    display: flex;
    flex-direction: column;
    align-items: center
}

.database-wrapper .database-container .right .recent-comps .comp .comp-wapper .comp-logo {
    width: 90px;
    height: 90px;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
    border: 1px solid #E5E5E5;
    border-radius: 2px
}

.database-wrapper .database-container .right .recent-comps .comp .comp-wapper .comp-logo .img {
    width: 60px;
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center
}

.database-wrapper .database-container .right .recent-comps .comp .comp-wapper .comp-name {
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    margin-bottom: 2px;
    text-align: center
}

.database-wrapper .database-container .right .recent-comps .comp .comp-wapper .comp-count {
    font-size: 12px;
    font-weight: 400;
    color: #333333
}

.database-wrapper .database-container .right .hot-comps {
    width: 990px;
    background-color: white;
    margin-bottom: 15px;
    padding-bottom: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07)
}

.database-wrapper .database-container .right .hot-comps .title {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end
}

.database-wrapper .database-container .right .hot-comps .title .part-title {
    height: 36px;
    display: flex;
    align-items: flex-end;
    margin-left: 0
}

.database-wrapper .database-container .right .hot-comps .title .part-title .red-line {
    width: 4px;
    height: 16px;
    background-color: #DE1E31;
    margin-left: 20px;
    margin-right: 10px;
    margin-bottom: 2px
}

.database-wrapper .database-container .right .hot-comps .title .part-title .text {
    height: 56px;
    display: flex;
    align-items: flex-end;
    font-size: 16px;
    font-weight: 600;
    color: #333333
}

.database-wrapper .database-container .right .hot-comps .title .checkout_btn {
    margin-right: 20px;
    display: flex
}

.database-wrapper .database-container .right .hot-comps .title .checkout_btn .football,.database-wrapper .database-container .right .hot-comps .title .checkout_btn .basketball {
    cursor: pointer;
    width: 77px;
    display: flex;
    align-items: center
}

.database-wrapper .database-container .right .hot-comps .title .checkout_btn .football .logo,.database-wrapper .database-container .right .hot-comps .title .checkout_btn .basketball .logo {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background-size: contain;
    background-repeat: no-repeat
}

.database-wrapper .database-container .right .hot-comps .title .checkout_btn .football .text,.database-wrapper .database-container .right .hot-comps .title .checkout_btn .basketball .text {
    height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 22px
}

.database-wrapper .database-container .right .hot-comps .title .checkout_btn .football.active .text,.database-wrapper .database-container .right .hot-comps .title .checkout_btn .basketball.active .text {
    color: #E74C5B
}

.database-wrapper .database-container .right .hot-comps .title .checkout_btn .basketball {
    justify-content: flex-end
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper {
    display: flex;
    flex-wrap: wrap
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper .comp {
    width: 290px;
    margin-right: 20px;
    margin-left: 20px;
    flex: none;
    height: 85px;
    border-bottom: 1px #F3F3F3 solid;
    display: flex
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper .comp .logo {
    width: 55px;
    height: 85px;
    display: flex;
    justify-content: flex-end;
    align-items: center
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper .comp .logo .img {
    width: 45px;
    height: 45px;
    background-size: contain;
    background-repeat: no-repeat
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper .comp .info {
    width: 235px
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper .comp .info .comp-name {
    margin-top: 20px;
    margin-left: 20px;
    height: 18px;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    line-height: 18px
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper .comp .info .links {
    margin-top: 15px;
    margin-left: 20px;
    display: flex
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper .comp .info .links .link {
    height: 12px;
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    line-height: 12px
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper .comp .info .links .a1 {
    width: 54px
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper .comp .info .links .a2 {
    width: 85px;
    text-align: center;
    border-left: 1px solid #DADADA;
    border-right: 1px solid #DADADA
}

.database-wrapper .database-container .right .hot-comps .comp-wrapper .comp .info .links .a3 {
    width: 54px;
    text-align: right
}

.database-wrapper .database-container .right .hot-teams {
    width: 990px;
    background-color: white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.07);
    padding-bottom: 20px;
    border-radius: 4px
}

.database-wrapper .database-container .right .hot-teams .title {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end
}

.database-wrapper .database-container .right .hot-teams .title .part-title {
    height: 36px;
    display: flex;
    align-items: flex-end;
    margin-left: 0
}

.database-wrapper .database-container .right .hot-teams .title .part-title .red-line {
    width: 4px;
    height: 16px;
    background-color: #DE1E31;
    margin-left: 20px;
    margin-right: 10px;
    margin-bottom: 2px
}

.database-wrapper .database-container .right .hot-teams .title .part-title .text {
    height: 56px;
    display: flex;
    align-items: flex-end;
    font-size: 16px;
    font-weight: 600;
    color: #333333
}

.database-wrapper .database-container .right .hot-teams .title .checkout_btn {
    margin-right: 20px;
    display: flex
}

.database-wrapper .database-container .right .hot-teams .title .checkout_btn .football,.database-wrapper .database-container .right .hot-teams .title .checkout_btn .basketball {
    cursor: pointer;
    width: 77px;
    display: flex;
    align-items: center
}

.database-wrapper .database-container .right .hot-teams .title .checkout_btn .football .logo,.database-wrapper .database-container .right .hot-teams .title .checkout_btn .basketball .logo {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background-size: contain;
    background-repeat: no-repeat
}

.database-wrapper .database-container .right .hot-teams .title .checkout_btn .football .text,.database-wrapper .database-container .right .hot-teams .title .checkout_btn .basketball .text {
    height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 22px
}

.database-wrapper .database-container .right .hot-teams .title .checkout_btn .football.active .text,.database-wrapper .database-container .right .hot-teams .title .checkout_btn .basketball.active .text {
    color: #E74C5B
}

.database-wrapper .database-container .right .hot-teams .title .checkout_btn .basketball {
    justify-content: flex-end
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper {
    display: flex;
    flex-wrap: wrap
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp {
    width: 290px;
    margin-right: 20px;
    margin-left: 20px;
    flex: none;
    height: 85px;
    border-bottom: 1px #F3F3F3 solid;
    display: none
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp.active {
    display: flex
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp .logo {
    width: 55px;
    height: 85px;
    display: flex;
    justify-content: flex-end;
    align-items: center
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp .logo .img {
    width: 45px;
    height: 45px;
    background-size: contain;
    background-repeat: no-repeat
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp .info {
    width: 235px
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp .info .comp-name {
    margin-top: 20px;
    margin-left: 20px;
    height: 18px;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    line-height: 18px
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp .info .links {
    margin-top: 15px;
    margin-left: 20px;
    display: flex
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp .info .links .link {
    height: 12px;
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    line-height: 12px
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp .info .links .a1 {
    width: 54px
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp .info .links .a2 {
    width: 85px;
    text-align: center;
    border-left: 1px solid #DADADA;
    border-right: 1px solid #DADADA
}

.database-wrapper .database-container .right .hot-teams .comp-wrapper .comp .info .links .a3 {
    width: 54px;
    text-align: right
}

.database-wrapper .database-container .right .search-result {
    box-shadow: 0 2px 6px rgba(0,0,0,0.07);
    width: 990px;
    background-color: white;
    border-radius: 4px;
    padding: 15px;
    padding-bottom: 1px;
    box-sizing: border-box
}

.database-wrapper .database-container .right .search-result .table-wrapper {
    margin-bottom: 15px;
    width: 960px;
    padding-top: 8px;
    overflow: hidden
}

.database-wrapper .database-container .right .search-result .table-wrapper table {
    flex: none;
    width: 100%;
    padding-top: 8px;
    position: relative;
    z-index: 1;
    border-bottom: 1px solid #E8E8E8;
    border-left: 1px solid #E8E8E8;
    table-layout: fixed
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead {
    height: 44px;
    position: relative;
    z-index: 1
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th {
    font-size: 12px;
    height: 44px;
    color: #666666;
    border-right: 1px solid #E8E8E8;
    border-top: 1px solid #E8E8E8;
    position: relative
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th::before {
    content: "";
    width: 100%;
    height: 8px;
    background-color: #717390;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%)
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lan,.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lv {
    padding: 0;
    width: 150px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lan .play,.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lv .play {
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lan .chang,.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lv .chang {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    display: flex
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lan .chang>span,.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lv .chang>span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-right: 1px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lan .chang>span:first-child,.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lv .chang>span:first-child {
    margin-right: 1px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lan .chang>span {
    background-color: #4AA0FF
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lan::before {
    background-color: #4AA0FF
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lv .chang>span {
    background-color: #54C975
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.lv::before {
    background-color: #54C975
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.team {
    width: 155px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.w150 {
    width: 150px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.w300 {
    width: 300px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.w160 {
    width: 160px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.w220 {
    width: 220px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.w80 {
    width: 80px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.w90 {
    width: 90px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.w240 {
    width: 240px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.w130 {
    width: 130px
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.sort {
    position: relative
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.sort::after {
    content: '';
    border: 5px solid transparent;
    border-top-color: #666;
    position: absolute;
    top: 18px;
    right: 5px;
    transition: 0.3s;
    transform: rotateX(0deg);
    transform-origin: center 25%
}

.database-wrapper .database-container .right .search-result .table-wrapper table thead tr th.sort.active::after {
    transform: rotateX(180deg)
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody {
    width: 827px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    overflow: hidden
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.total {
    height: 45px
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.total td {
    border-top: 1px solid #E8E8E8;
    font-size: 12px;
    color: #333;
    font-weight: 500;
    background-color: #ECF0F8
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.total td.t1 {
    text-align: right;
    font-weight: normal
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.total td.t2 {
    text-align: left;
    font-weight: normal
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.total td.score {
    font-weight: bold;
    color: #333
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.total td.score .red {
    color: #de1e30
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.total td .td_ca {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 0;
    flex-direction: row
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data {
    height: 39px
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td {
    height: 34px;
    border-right: 1px solid #E8E8E8;
    border-top: 1px solid #E8E8E8;
    position: relative;
    font-size: 12px;
    color: #666
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td.light_gray::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #F8F8FC;
    z-index: -2
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td.ca {
    line-height: 0
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td.tl {
    text-align: left
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td.tr {
    text-align: right
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td .v_center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td .td_ca {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td .comp {
    display: flex;
    align-items: center
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td .comp .logo {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    margin-left: 15px;
    background-size: contain;
    background-repeat: no-repeat
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td .comp .comp-name {
    font-size: 12px;
    color: #e30c0c
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td .country {
    display: flex;
    align-items: center
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td .country .logo {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    margin-left: 15px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data td .country .country-name {
    font-size: 12px;
    color: #333
}

.database-wrapper .database-container .right .search-result .table-wrapper table tbody tr.match_data:hover td {
    background-color: #E8E8E8 !important
}

.database-wrapper .database-container .right .search-result .table-wrapper .empty-msg {
    font-size: 16px;
    color: #bbb;
    height: 250px;
    border: 1px solid #E8E8E8;
    border-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center
}

.database-wrapper .database-container .right .empty-msg {
    text-align: center;
    width: 990px;
    height: 426px;
    background-color: white;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center
}

</style>