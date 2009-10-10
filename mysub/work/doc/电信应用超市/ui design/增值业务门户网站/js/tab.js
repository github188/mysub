function secBoard_st1(n)
{
 for(i=0;i<secTable_st1.cells.length;i++)
 secTable_st1.cells[i].className="sec_1";
 secTable_st1.cells[n].className="sec_2";
 for(i=0;i<mainTable_st1.tBodies.length;i++)
 mainTable_st1.tBodies[i].style.display="none";
 mainTable_st1.tBodies[n].style.display="block";
}

function secBoard_st2(n)
{
 for(i=0;i<secTable_st2.cells.length;i++)
 secTable_st2.cells[i].className="sec_3";
 secTable_st2.cells[n].className="sec_4";
 for(i=0;i<mainTable_st2.tBodies.length;i++)
 mainTable_st2.tBodies[i].style.display="none";
 mainTable_st2.tBodies[n].style.display="block";
}


function secBoard_st3(n)
{
 for(i=0;i<secTable_st3.cells.length;i++)
 secTable_st3.cells[i].className="sec_5";
 secTable_st3.cells[n].className="sec_6";
 for(i=0;i<mainTable_st3.tBodies.length;i++)
 mainTable_st3.tBodies[i].style.display="none";
 mainTable_st3.tBodies[n].style.display="block";
}

function secBoard_st4(n)
{
 for(i=0;i<secTable_st4.cells.length;i++)
 secTable_st4.cells[i].className="sec_7";
 secTable_st4.cells[n].className="sec_8";
 for(i=0;i<mainTable_st4.tBodies.length;i++)
 mainTable_st4.tBodies[i].style.display="none";
 mainTable_st4.tBodies[n].style.display="block";
}