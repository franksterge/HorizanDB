LOAD data local infile '/home/ec2-user/HorizanData/SchoolDetail.csv'
  into table SchoolDetail
  fields terminated by ',' lines terminated by '\n'
  ignore 1 lines
set SchoolID = null;
insert into SchoolDetail (SchoolName, SchoolWebsite, PhoneNumber, SchoolSize, GenderRestriction, SchoolType, SchoolLocation, SchoolEnvironment, StudentFacultyRatio, AcceptanceRate)
values ('school name', 'website', '(000)000-0000', '55555', 'coed', 'private', 'here', 'subhere', '11', '100%');
select * from SchoolDetail;
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
insert into TestDetail (TestName, TestDesc) values ('SAT', 'SAT Test by Collegeboard');
use HorizanDB;
insert into MajorRanking (MajorRankingName) values ('Business'), ('Communication'), ('Computer Science'), ('Biology'), ('Psychology'), ('Engineering')
use HorizanDB;


/*
  tuition name: general/in-state/out-state
  tuition type: general/income-specific
*/
insert into TuitionDetail (TuitionName, TuitionType, IncomeRangeUpperBound, IncomeRangeLowerBound)
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