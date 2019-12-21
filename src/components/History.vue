<template>
    <div class="timeline_group">
        <div class="timeline"></div>
        <div class="timeline_cards">
            <div class="timeline_card_row">
                <div class="timeline_card " data-wow-delay="1s">
                    <h4>2004 - 方方繪本創立</h4>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores eius ut similique et ipsam. Nemo laboriosam ea praesentium maiores voluptat</p>
                </div>
            </div>
            <div class="timeline_card_row  wow fadeInUp">
                <div class="timeline_card" data-wow-delay="1s">
                    <h4>2008 - 榮獲兒童教育獎</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eaque quidem adipisci. Aut perspiciatis rerum, ducimus neque, culpa quisquam minus corpor</p>
                </div>
            </div>
            <div class="timeline_card_row  wow fadeInUp">
                <div class="timeline_card" data-wow-delay="1s">
                    <h4>2010 - 教育雜誌第一屆伴讀之星</h4>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis earum officiis quaerat perspiciatis molestias officia eligendi sit, sint sapiente</p>
                </div>
            </div>
            <div class="timeline_card_row  wow fadeInUp">
                <div class="timeline_card" data-wow-delay="1s">
                    <h4>2014 - 榮獲亞洲幼兒啟蒙獎</h4>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod sequi odit ducimus reiciendis, amet sapiente id unde doloribus saepe modi, adipisci</p>
                </div>
            </div>
            <div class="timeline_card_row  wow fadeInUp">
                <div class="timeline_card" data-wow-delay="1s">
                    <h4>2018 - 榮獲台北市精選故事屋</h4>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas atque ipsam eum recusandae sint necessitatibus repellendus molestiae debitis tempo</p>
                </div>
            </div>
            <div class="timeline_card_row  wow fadeInUp">
                <div class="timeline_card" data-wow-delay="1s">
                    <h4>2018 - 入選蘋果雜誌亞洲前十商店</h4>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas atque ipsam eum recusandae sint necessitatibus repellendus molestiae debitis tempo</p>
                </div>
            </div>
        </div>
</div>
           
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss' ;
*{
  position: relative;
}
/* --------------------- */
/* $Experience
------------------------ */
.experience{
    padding: 80px 0 120px;
}
@media (max-width:768px){
    .experience{
        padding: 40px 0 140px;

    }
}
/* timeline */
.timeline_group{
    max-width: 960px;
    margin: 0 auto;
}
.timeline{
    background-color:$third-color;
    height: 100%;
    width: 5px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 3px 10px rgba(0,0,0,.2);
}
@media (max-width:768px){
    .timeline{
        position: absolute;
        width:2px;
        left: 0;
        transform: translateX(0%);
        box-shadow: 0 3px 10px rgba(0,0,0,.2);
    }
}
.timeline_card_row:nth-child(odd){
    display: flex;
    justify-content: flex-start;
}
.timeline_card_row:nth-child(even){
    display: flex;
    justify-content: flex-end;
}
.timeline_card{
    background-color: #fefefe;
    box-shadow: 0 2px 2px 3px rgba(131, 131, 131, 0.3);
    padding: 24px;
    border-radius: 4px;
    width: calc(50% - 24px);
}
.timeline_card h4{
  font-weight: 700;
  font-size: 18px;
}
@media (max-width:768px){
    .timeline_card{
        padding: 16px;
        border-radius: 4px;
        width: 100%;
        margin: 24px 16px;
    }
}
.timeline_card::after{
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: $third-color;
    position: absolute;
    top: 50%;
    right: -24px;
    transform: translate(50%,-50%);
    box-shadow: 0 3px 4px rgba(0,0,0,.2);
}
.timeline_card_row:nth-child(even) > :after{
    left: -24px;
    transform: translate(-50%,-50%);
    box-shadow: 0 3px 10px rgba(0,0,0,.2);
}
@media (max-width:768px){
    .timeline_card_row > ::after{
        content: "";
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: $third-color;
        position: absolute;
        top: 50%;
        left: -16px;
        transform: translate(-50%,-50%);
        box-shadow: 0 3px 10px rgba(0,0,0,.2);
    }
    .timeline_card_row:nth-child(even) > :after{
        left: -16px;
        transform: translate(-50%,-50%);
        box-shadow: 0 3px 10px rgba(0,0,0,.2);
    }
}
.timeline_card p{
    margin: 0;
}

</style>