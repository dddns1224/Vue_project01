import { debounce } from './util'
import BackTop from 'components/common/backtop/BackTop'

export const imgListener = {
    data(){
        return {
            imgListener: null
        }
    },
    mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.imgListener = () => {refresh()}
        this.$bus.$on('itemImageLoad', this.imgListener)
    }
} 
export const backTopListener = {
    components:{
        BackTop
    },
    data(){
        return {
            isShow: false
        }
    },
    methods: {
        backClick(){
            this.$refs.scroll.scrollTo(0,0,300)
        }
    }
}