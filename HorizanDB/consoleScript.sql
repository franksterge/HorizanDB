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
