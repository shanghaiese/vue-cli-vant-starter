<template>
    <div></div>
</template>

<script>
    import {appConst} from "../../../global/appConst";

    export default {
        name: 'indexPage',
        props: [],
        data() {
            return {
                proType: 'APARTMENT',
                spuType: 'BUILDING',
                nowIndex: 0,
                searchText: '',
                ifFocus: 'true',
                locationName: '全国',
                selectedType: 'kangyang', //all kangyang parking building shop
                hotSearchList:
                    [
                        {
                            name: '热门1111111111',
                            index: 0,
                            key: 'hotsearch0'
                        },
                        {
                            name: '热门222222222222',
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
                            name: '热门435435345',
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
                            name: '项目热门热门热门热门热门',
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
                    ],
                showTagList: true,
                tabList: [
                    {
                        title: '康养公寓',
                        isSelected: true,
                        proType: 'APARTMENT',
                        spuType: 'BUILDING'
                    }, {
                        title: '车位',
                        isSelected: false,
                        proType: 'CARPORT',
                        spuType: 'CARPORT'
                    }, {
                        title: '长租公寓',
                        isSelected: false,
                        proType: 'LONG_TERM_APARTMENT',
                        spuType: 'BUILDING'
                    }, {
                        title: '商业',
                        isSelected: false,
                        proType: 'STOR',
                        spuType: 'STOR'
                    }],
                bannerArr: [],
                contentList: [],
                bannerlist: [],
                items: [{}, {}, {}, {}, {}, {}],
            }
        },
        methods: {
            clearText() {
                this.searchText = '';
            },
            clearHistoryList() {
                this.historySearchList = [];
            },
            searchHot() {
                this.searchProject()
            },
            searchHistory() {
                this.searchProject()
            },
            changeTabSearch(index) {
                let proType = this.tabList[index].proType
                let spuType = this.tabList[index].spuType
                let apiUrl = this.$appConst.apiUrl
                let url = `/ld/spu/front/${proType}/${spuType}/list`
                let bannerUrl = '/ld/project/list'
                let params = {
                    // type: this.tabList[index].proType
                }

                this.$axios.all([this.$axios.post(apiUrl + url, {}), this.$axios.post(apiUrl + bannerUrl, params)]).then(response => {
                    if (response.length) {
                        let contentArr = response[0].data.data
                        let bannerImgArr = response[1].data.data.content
                        this.contentList = contentArr
                        this.bannerArr = bannerImgArr

                        if (bannerImgArr.length) {
                            this.bannerlist = appConst.handleGetListImgUrl(response[1].data.data.content[0].attachments, 'businessLicense')
                            // eslint-disable-next-line no-console
                            console.log(this.bannerlist)
                        }

                        if (contentArr.length) {
                            contentArr.map(item => {
                                if (item.attachments && item.attachments.length) {
                                    let itemAttachmentsthis = appConst.handleGetListImgUrl(item.attachments, 'pageMap')
                                    item.url = itemAttachmentsthis[0].url
                                }
                                if (this.proType === 'CARPORT' || this.proType === 'STOR') {
                                    item.url = this.bannerlist[0].url
                                }
                            })
                        }
                    }
                })

                this.showTagList = false;
                this.$refs.inputSearch.blur();
            },
            searchProject() {
                let proType = this.proType
                let spuType = this.spuType
                let apiUrl = this.$appConst.apiUrl
                let url = `/ld/spu/front/${proType}/${spuType}/list`
                let bannerUrl = '/ld/project/list'
                let params = {
                    type: this.proType
                }

                this.$axios.all([this.$axios.post(apiUrl + url, {}), this.$axios.post(apiUrl + bannerUrl, params)]).then(response => {
                    if (response.length) {
                        let contentArr = response[0].data.data
                        let bannerImgArr = response[1].data.data.content
                        this.contentList = contentArr
                        this.bannerArr = bannerImgArr

                        if (bannerImgArr.length) {
                            this.bannerlist = appConst.handleGetListImgUrl(response[1].data.data.content[0].attachments, 'businessLicense')
                            // eslint-disable-next-line no-console
                            console.log(this.bannerlist)
                        }

                        if (contentArr.length) {
                            contentArr.map(item => {
                                if (item.attachments && item.attachments.length) {
                                    let itemAttachmentsthis = appConst.handleGetListImgUrl(item.attachments, 'pageMap')
                                    item.url = itemAttachmentsthis[0].url
                                }
                                if (this.proType === 'CARPORT' || this.proType === 'STOR') {
                                    item.url = this.bannerlist[0].url
                                }
                            })
                        }
                    }
                })

                this.showTagList = false;
                this.$refs.inputSearch.blur();
            },
            goToParkingDetail (item) {
                this.$router.push(`/parkingProjectDetail?proType=CARPORT&projectId=${item.projectId}&spuType=CARPORT&id=${item.id}`)
            },
            goToKangYangDetail (item) {
                this.$router.push(`/kangyangProjectDetail?proType=APARTMENT&projectId=${item.projectId}&spuType=BUILDING&id=${item.id}`)
            },
            goToBuildingDetail (item) {
                this.$router.push(`/buildingProjectDetail?proType=LONG_TERM_APARTMENT&projectId=${item.projectId}&spuType=BUILDING&id=${item.id}`)
            },
            goToShopDetail (item) {
                this.$router.push(`/shopProjectDetail?proType=STOR&projectId=${item.projectId}&spuType=STOR&id=${item.id}`)
            }

        }
    }
</script>

<style scoped lang="less">
</style>

