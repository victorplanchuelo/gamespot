<template>
    <div>
        <carousel
            :per-page="1"
            :mouse-drag="true"
            :paginationEnabled="false"  
        >
            <slide v-for="(slide, index) in slides" :key="index">
                <div 
                    class="slider_bck" 
                    :style="{'background': `url(${slide.bck})`}"
                >
                    <div class="gradient">
                        <div class="container">
                            <div class="content">
                                <app-button
                                    linkTo="#"
                                    :addClass="['hello', 'there']"
                                    type="link"
                                >
                                    See review
                                </app-button>

                                <div class="item">
                                    {{slide.title}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </slide>
        </carousel>
    </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
import Slide1 from '../../assets/images/featured/1.jpg'
import Slide2 from '../../assets/images/featured/2.jpg'
import Slide3 from '../../assets/images/featured/3.jpg'
import Slide4 from '../../assets/images/featured/4.jpg'

export default {
    data() {
        return {
            slides: [
                {
                    title: 'Red Dead Redemption 2',
                    bck: Slide1
                },
                {
                    title: 'Watchdogs',
                    bck: Slide2
                },
                {
                    title: 'Rise of the tomb raider',
                    bck: Slide3
                },
                {
                    title: 'Spider-man',
                    bck: Slide4
                },
            ]
        }
    },
    components: {
        Carousel,
        Slide
    }    
}
</script>