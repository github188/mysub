create table  TD_EXP_GIFT_ACT_TYPE(
  activity_id number(5), 
  activity_type_name varchar2(400),
  activity_deposit_money number(6) ,
  activity_gift_money number(6) , 
  activity_agreement varchar2(400)
);

create table TD_EXP_GIFT_PRICE_PLAN(
 price_plan_id number(13), 
 price_plan_name varchar2(100)
);

create table TD_EXP_GIFT_OFFERING(
  offering_id  number(13),  
  offering_name  varchar2(100)
);

create table TD_EXP_GIFT_MAPPING(
  mapping_id number(6),
  offering_id number(13), 
  deposit_price_plan_id number(13), 
  gift_price_plan_id number(13),
  activity_type_id number(5)
);
