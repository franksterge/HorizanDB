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
select * from SchoolTest;
alter table SchoolTest change column ScoreLowerBounds ScoreLowerBound int;

select count(*) from NLPData n join SchoolNLP sn on n.NLPID = sn.NLPID order by sn.SchoolID;
insert into NLPData (NLPCategory) values ('Reputation'), ('Facilities'), ('Happiness'), ('Clubs'), ('Location'), ('Food'), ('Social'), ('Opportunites'), ('Safety'), ('Internet');
Select * from SchoolDetail;
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
Select * from SchoolDetail s left join SchoolImage si on s.SchoolID = si.SchoolID
left join ImageDetail i on si.ImageID = i.ImageID where i.ImageID is null;
use HorizanDB;
select * from SchoolDetail where SchoolName = "University of Maryland College Park";
show procedure status where Db = 'HorizanDB';
show tables;
/*
TODO: insert logos for following schools with the correct name 
*/
use HorizanDB;
Call pInsSchoolImage("Louisiana State University- Baton Rogue", "Louisiana State University- Baton Rogue Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/Louisiana_State_University-_Baton_Rougelogo.png");
Call pInsSchoolImage("North Carolina State University- Raleigh", "North Carolina State University- Raleigh Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/North_Carolina_State_University-_Raleighlogo.png");
Call pInsSchoolImage("Purdue University-West Lafayette", "Purdue University-West Lafayette Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/Purdue_University-_West_Lafayettelogo.png");
Call pInsSchoolImage("Rensselaer Polytechnic Institute", "Rensselaer Polytechnic Institute Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/Rennsselaer_Polytechnic_Institutelogo.png");
Call pInsSchoolImage("Rutgers University- Newark", "Rutgers University- Newark Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/Rutgers_University_Newarklogo.png");
Call pInsSchoolImage("St. John's University", "St. John's University Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/St._John's_Universitylogo.png");
Call pInsSchoolImage("Texas A&M University- College Station", "Texas A&M University- College Station Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/Texas_A&M_University-_College_Stationlogo.png");
Call pInsSchoolImage("University of Alabama- Birmingham", "University of Alabama- Birmingham Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/University_of_Alabama_Birminghamlogo.png");
Call pInsSchoolImage("University of Illinois- Urbana Champaign", "University of Illinois- Urbana Champaign Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/University_of_Illinois-_Urbana_Champaignlogo.png");
Call pInsSchoolImage("University of Maryland College Park", "University of Maryland College Park Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/University_of_Maryland-_College_Parklogo.png");
Call pInsSchoolImage("University of Missouri- St. Louis", "University of Missouri- St. Louis Logo", "Logo", "https://horizan-images.s3.us-east-2.amazonaws.com/Univerisity/SchoolLogos/University_of_Missouri-_St._Louislogo.png");



use HorizanDB;
Select distinct SchoolName from SchoolDetail;
select DATE(concat(Year(now()), "-", "01-01"));
select * from vAllSchoolData;
Select distinct SchoolName from vAllSchoolData;
select distinct SchoolName from vAllLeftSchoolData;

use HorizanDB;
Select * from UserDetail;

use HorizanDB;
select * from SchoolImages;

select * from SchoolDetail;
Select * from SchoolNLP;
use HorizanDB;
call pGetSchoolIncomeSpecificTuition('University of Washington');
select * from SchoolTuition st
join TuitionDetail t on t.TuitionID = st.TuitionID;
use HorizanDB;
select * from ImageDetail
where ImageType = 'Logo';

use HorizanDB;
Select * from ImageDetail where ImageType = "General";
Delete from SchoolImage where ImageType = "General"


/* 
sample procedure call and datetime format for pInsUserResponse
note:
- the procedure automatically takeout the space in the filename.
 */
Use HorizanDB;
call pInsUserResponse('John', 'Doe', 'johndoe@testemail.com/', 'JohnDoejohndoe@testemail.comsurvey2019-08-24 21:23:54.json', '2019-08-24 21:23:54');
Select * from UserResponse;

select Date_Format('2019-08-24 21:23:54', '%Y-%m-%d %H:%i:%s');