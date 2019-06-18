use HorizanDB;
LOAD data local infile '/Users/Frank/OneDrive/Horizan/LocalFiles/RawData/SchoolData/SchoolDetail.csv'
  into table SchoolDetail
  fields terminated by ',' lines terminated by '\n'
  ignore 1 lines
  (SchoolName, SchoolWebsite,PhoneNumber, SchoolSize, GenderRestriction, SchoolType, SchoolLocation, SchoolEnvironment, StudentFacultyRatio, AcceptanceRate)


use HorizanDB;
select * from TuitionDetail;
use HorizanDB;
delete from SchoolDetail where SchoolID >= 0 ;
set SchoolID = null;
insert into SchoolDetail (SchoolName, SchoolWebsite, PhoneNumber, SchoolSize, GenderRestriction, SchoolType, SchoolLocation, SchoolEnvironment, StudentFacultyRatio, AcceptanceRate)
values ('school name', 'website', '(000)000-0000', '55555', 'coed', 'private', 'here', 'subhere', '11', '100%');
LOAD data local infile '/home/ec2-user/HorizanData/SchoolDetail.csv'   into table SchoolDetail   fields terminated by ',' lines terminated by '\n'   ignore 1 lines (SchoolName, SchoolWebsite, PhoneNumber, SchoolSize, GenderRestriction, SchoolType, SchoolLocation, SchoolEnvironment, StudentFacultyRatio, AcceptanceRate) set SchoolID = null;

use HorizanDB;
Insert into ApplicationDetail (ApplicationName, ApplicationDesc, ApplicationLink)
values ('Common App', 'Under grad application for over 800 schools around the world', 'www.commonapp.org');
Insert into ApplicationDetail (ApplicationName, ApplicationDesc, ApplicationLink)
values ('Coalition App', 'New under grad application with more than 140 schools', 'www.coalitionforcollegeaccess.org');
use HorizanDB;
Insert into RankingSource(SourceName, SourceLink) 
values ('National Science Foundation', "https://ncsesdata.nsf.gov/herd/2014/?fbclid=IwAR0fUciuSjIA2lswO1ty2M_BvLl8DWt0qzLVPVr5oqkNMHkchjpgRzFMyh0");
Insert into RankingSource(SourceName, SourceLink)
values ('Niche.com', "https://www.niche.com/colleges/search/best-colleges/");
Insert into RankingSource(SourceName, SourceLink)
values ('Horizan Readjusted', "Readjusted data from Niche and NSF rankings");
use HorizanDB;
insert into TestDetail (TestName, TestDesc) values ('ACT', 'American College Test');
insert into TestDetail (TestName, TestDec) values ('SAT', 'SAT Test by Collegeboard');
use HorizanDB;
insert into MajorRanking (MajorRankingName) values ('Business'), ('Communication'), ('Computer Science'), ('Biology'), ('Psychology'), ('Engineering')
use HorizanDB;
Select * from SchoolMajorRankingSource;
Select * from TuitionDetail;


/*
  tuition name: general/in-state/out-state
  tuition type: general/income-specific
*/
use HorizanDB;
select * from TuitionDetail;
insert into TuitionDetail (TuitionName, TuitionType, IncomeRangeUpperBound, IncomeRangeLowerBound)
values ('in-state', 'general', null, 0), ('out-state', 'general', null, 0);
values ('general', 'low', 30000, 0), ('general', 'medium-low', 48000, 30001), ('general', 'medium', 75000, 48001), ('general', 'medium-high', 110000, 75001), ('general', 'high', null, 110000);
use HorizanDB;
Select * from RankingSource;

use HorizanDB;
drop table SchoolMajorRankingSource;

use HorizanDB;
Select * from SchoolApplication;
insert into SchoolApplication (SchoolID, ApplicationID, DueDate)
values (1,1, '01/01/2020');
delete from TestDetail;
use HorizanDB;
Select * from SchoolDetail;
Call pInsSchoolTuition("Yale University", 'general', 'high', 35873);
FLUSH HOSTS;

Use HorizanDB;
Select SchoolID from SchoolNLP;

use HorizanDB;
call pInsUserDetail('test', 'User1', 'helloworld1@gmail.com');
use HorizanDB;
call pInsUserCollection('test', 'User', 'helloworld@gmail.com', 'My List1');

use HorizanDB;
select * from vTips;
use HorizanDB;

call pGetSchoolMajorRanking('University of Washington');

select * from tempRanking;

use HorizanDB;
select * from SchoolDetail;
show procedure status where Db = 'HorizanDB';
show tables;

