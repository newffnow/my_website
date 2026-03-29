function isleap(year)
{
    return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
}


function diffdate(begin_year, begin_month, begin_day, end_year, end_month, end_day)
{
    var days;
    var months, years;
    var tmpyear, tmpmonth, leapyear;
    var monthday = [
                        [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
                        [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
                        ];
    if (isleap(end_year)){
        leapyear = 1;
    }else{
        leapyear = 0;
    }
    years = end_year - begin_year;
    months = end_month - begin_month;
    days = end_day - begin_day;
    tmpyear = begin_year;
    while (years>0){
        if (isleap(tmpyear))
            days += 366;
        else
            days += 365;
        tmpyear++;
        years--;
    }
    if (months>0){
        while (months-->0){
            days += monthday[leapyear][begin_month++ - 1];
        }
    }
    else{
        while (months++<0){
            begin_month--;
            days -= monthday[leapyear][begin_month - 1];
        }
    }
    return days;
}

function show(create_days_id, remain_days_id, lunar_time_id)
{
    var my_date = new Date();
    var lunar_date = new Date().toLocaleString('zh-CN-u-ca-chinese').replace(/(\d+)\s*?年/, (_,y)=>"甲乙丙丁戊己庚辛壬癸".charAt((y-4)%10) + "子丑寅卯辰巳午未申酉戌亥".charAt((y-4)%12) + "年");
    var create_days_ele = document.getElementById(create_days_id);
    var remain_days_ele = document.getElementById(remain_days_id);
    var lunar_days_ele = document.getElementById(lunar_time_id);

    var addStr = diffdate(2023, 4, 1, my_date.getFullYear(), my_date.getMonth()+1, my_date.getDate()) + "天";
    create_days_ele.innerHTML = "今天是网站创建的第" + addStr;

    var remainDays = diffdate(my_date.getFullYear(), my_date.getMonth()+1, my_date.getDate(), my_date.getFullYear(), 12, 31);
    remain_days_ele.innerHTML = "今年还剩余" + remainDays + "天";

    lunar_days_ele.innerHTML = "农历" + lunar_date;
}

function show_my(my_days_id)
{
    var my_date = new Date();
    var my_days_ele = document.getElementById(my_days_id);

    var addStr = diffdate(2026, 3, 28, my_date.getFullYear(), my_date.getMonth()+1, my_date.getDate()) + "天";
    my_days_ele.innerHTML = "今天已经是第" + addStr;
}

// //document.bgColor = "gray";
// window.setInterval("show()", 900);
// window.onload = show("create_days", "remain_days");
