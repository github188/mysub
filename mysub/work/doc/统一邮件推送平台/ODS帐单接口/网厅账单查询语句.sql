-- C网账单网厅前台查询语句

-- C网账单用户级查询  -- 于20090724日修改，要求通过单号码查询出该用户的所有产品账单，并把赠费单独显示出来
--固网、C网、小灵通
select distinct acct_id
  from pu_dm.view_account_200910 t
 where t.acc_nbr = '13320993880';

--宽带
select distinct acct_id
  from pu_dm.view_account_200910 t
 where t.serv_id = (select distinct prod_id
                      from pu_dm.view_account_adslnbr_to_acct_b n
                     where n.access_number = 'CD83618372'); -- pu_dm.view_account_adslnbr_to_acct_a

select acc_nbr, latn_name, month_no, bill_item_name, level_id, charge
  from (select acc_nbr,
               latn_name,
               month_no,
               row_num,
               bill_item_name,
               level_id,
               charge
          from (select t.acc_nbr,
                       l.latn_name,
                       t.month_no,
                       b.row_num,
                       b.bill_item_name,
                       b.level_id,
                       sum(t.charege) / 100 charge
                  from pu_dm.view_account_200910 t,
                       pu_dm.view_account_type_b   b, --  pu_dm.view_account_type_a
                       pu_dm.view_account_latn                       l
                 where t.acct_id = '102910736'
                   and t.data_source = 1
                   and t.acct_item_type_id = b.acct_item_type_id
                   and t.latn_id = l.latn_id
                 group by t.acc_nbr,
                          t.month_no,
                          b.level_id,
                          b.row_num,
                          b.bill_item_name,
                          l.latn_name
                 order by t.acc_nbr, b.row_num, b.level_id)
        union all
        select acc_nbr,
               latn_name,
               month_no,
               row_num,
               bill_item_name,
               level_id,
               charge
          from (select t.acc_nbr,
                       l.latn_name,
                       t.month_no,
                       1000000000 row_num,
                       '赠费' bill_item_name,
                       1 level_id,
                       sum(t.charege) / 100 charge
                  from pu_dm.view_account_200910 t,
                       pu_dm.view_account_type_b   b, --  pu_dm.view_account_type_a
                       pu_dm.view_account_latn                       l
                 where t.acct_id = '102910736'
                   and t.data_source = 2
                   and b.level_id = 1
                   and t.acct_item_type_id = b.acct_item_type_id
                   and t.latn_id = l.latn_id
                 group by t.acc_nbr, t.month_no, l.latn_name
                 order by t.acc_nbr))
 order by acc_nbr, row_num, level_id;












-- C网账单账户级查询

-- C网账单账户级查询         -- 于20090724日修改，要求把赠费单独显示出来
--固网、C网、小灵通
select distinct acct_id
  from pu_dm.view_account_200910 t
 where t.acc_nbr = '13320993880';

--宽带
select distinct acct_id
  from pu_dm.view_account_200910 t
 where t.serv_id = (select distinct prod_id
                      from pu_dm.view_account_adslnbr_to_acct_b n
                     where n.access_number = 'CD83618372'); -- pu_dm.view_account_adslnbr_to_acct_a

select acct_id, latn_name, month_no, bill_item_name, level_id, charge
  from (select t.acct_id,
               l.latn_name,
               t.month_no,
               b.row_num,
               b.bill_item_name,
               b.level_id,
               sum(t.charege) / 100 charge
          from pu_dm.view_account_200910 t,
               pu_dm.view_account_type_b   b, --  pu_dm.view_account_type_a
               pu_dm.view_account_latn                       l
         where t.acct_id = '102910736'
           and t.data_source = 1
           and t.acct_item_type_id = b.acct_item_type_id
           and t.latn_id = l.latn_id
         group by t.acct_id,
                  t.month_no,
                  b.level_id,
                  b.row_num,
                  b.bill_item_name,
                  l.latn_name
         order by b.row_num, b.level_id)

union all

select acct_id, latn_name, month_no, bill_item_name, level_id, charge
  from (select t.acct_id,
               l.latn_name,
               t.month_no,
               '赠费' bill_item_name,
               1 level_id,
               sum(t.charege) / 100 charge
          from pu_dm.view_account_200910 t,
               pu_dm.view_account_type_b   b, --  pu_dm.view_account_type_a
               pu_dm.view_account_latn                       l
         where t.acct_id = '102910736'
           and t.data_source = 2
           and b.level_id = 1
           and t.acct_item_type_id = b.acct_item_type_id
           and t.latn_id = l.latn_id
         group by t.acct_id, t.month_no, l.latn_name);
