<template>
    <div>
        <div class="box">
            <div class="developer">
                <p class="title">慧萃 · 开发商</p>
                <div class="list">
                    <ul>
                        <li v-for="(item, index) in items" :key="index">
                            <div @click="toDetail(item.id)">
                                <img :src="require('../../../../src/assets/imgs/good.png')" alt />
                            </div>
                            <p class="p1">{{item.p1text}}</p>
                            <p class="p2">{{item.p2text}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="operator operatorExtra">
                <p class="title">慧萃 · 运营商</p>
                <div class="list">
                    <ul>
                        <li v-for="(item, index) in operatorItems" :key="index">
                            <div @click="toDetail(item.id)">
                                <img :src="require('../../../../src/assets/imgs/good.png')" alt />
                            </div>
                            <p class="p1">{{item.p1text}}</p>
                            <p class="p2">{{item.p2text}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div style="height: 50px">

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                items: [
                    {
                        id: 1,
                        src: "../../../../src/assets/imgs/good.png",
                        p1text: "绿地康养",
                        p2text: "一站式综合性康养社区"
                    },
                    {
                        id: 1,
                        src: "../../../../src/assets/imgs/good.png",
                        p1text: "绿地康养",
                        p2text: "一站式综合性康养社区"
                    },
                    {
                        id: 1,
                        src: "../../../../src/assets/imgs/good.png",
                        p1text: "绿地康养",
                        p2text: "一站式综合性康养社区"
                    },
                    {
                        id: 1,
                        src: "../../../../src/assets/imgs/good.png",
                        p1text: "绿地康养",
                        p2text: "一站式综合性康养社区"
                    }
                ],
                operatorItems: [
                    {
                        id: 1,
                        src: "../../../../src/assets/imgs/good.png",
                        p1text: "绿地康养",
                        p2text: "一站式综合性康养社区"
                    },
                    {
                        id: 1,
                        src: "../../../../src/assets/imgs/good.png",
                        p1text: "绿地康养",
                        p2text: "一站式综合性康养社区"
                    }
                ]
            };
        },
        computed: {},
        created() {},
        methods: {
            toDetail() {
                this.$router.push("/huicuiDetail")
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
