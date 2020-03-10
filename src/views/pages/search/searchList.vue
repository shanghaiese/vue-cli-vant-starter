<template>
    <div></div>
</template>

<script>

    export default {
        name: 'indexPage',
        props: [],
        data () {
            return {
                searchText:'',
                locationName: '全国',
                hotSearchList:[
                    {
                        name: '热门',
                        index: 0,
                        key: 'hotsearch0'
                    },
                    {
                        name: '热门',
                        index: 1,
                        key: 'hotsearch1'
                    },
                    {
                        name: '热门',
                        index: 2,
                        key: 'hotsearch2'
                    },
                    {
                        name: '热门',
                        index: 3,
                        key: 'hotsearch3'
                    },
                    {
                        name: '热门',
                        index: 4,
                        key: 'hotsearch4'
                    },
                    {
                        name: '热门',
                        index: 5,
                        key: 'hotsearch5'
                    }
                ],
                historySearchList:
                    [
                        {
                            name: '项目1',
                            index: 0,
                            key: 'historySearch0'
                        },
                        {
                            name: '项目22222',
                            index: 1,
                            key: 'historySearch1'
                        },
                        {
                            name: '项目333333',
                            index: 2,
                            key: 'historySearch2'
                        },
                        {
                            name: '项目4444444',
                            index: 3,
                            key: 'historySearch3'
                        },
                        {
                            name: '项目5555555',
                            index: 4,
                            key: 'historySearch4'
                        },
                        {
                            name: '项目6666666',
                            index: 5,
                            key: 'historySearch5'
                        }
                    ]
            }
        },
        methods: {
        }
    }
</script>

<style scoped lang="less">
</style>
