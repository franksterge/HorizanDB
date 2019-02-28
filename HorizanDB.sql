Drop DATABASE  HorizanDB;
Create Database HorizanDB;

Use HorizanDB;

# create tables
Create
Table SchoolDetail (
  SchoolID int AUTO_INCREMENT primary key not null,
  SchoolName nVarCHar(255) not null,
  SchoolWebsite nVarChar(255) not null,
  PhoneNumber nVarChar(14) not null CHECK (PhoneNumber Like '([0-9][0-9][0-9]) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
  SchoolSize int not null,
  GenderRestriction nVarChar(100) not null default 'Co-de',
  SchoolType nVarChar(100) not null,
  SchoolLocation nVarChar(100) not null,
  SchoolEnvironment nVarChar(100) not null,
  StudentFacultyRatio int not null,
  AcceptanceRate nVarChar(4) not null
);

Create
Table SchoolTag (
  TagID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  TagDesc nVarChar(100) not null
);

Create
Table TestDetail (
  TestID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  TestName nVarChar(100) not null,
  ScoreUpperBound int null,
  ScoreLowerBound int not null
);

# if application is not presented on the table then it's unavailable
Create
Table ApplicationDetail (
  ApplicationID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  ApplicationName nVarChar(100) not null,
  ApplicationDate date not null
);

Create
Table TuitionDetail (
  TuitionID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  InStateCost int not null,
  OutStateCost int null
);

Create
Table TuitionToIncome (
  IncomeID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  Tuition int not null,
  RangeUpperBound int null,
  RangeLowerBound int not null
);

Create
Table SchoolRanking(
  RankingID int auto_increment primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  MajorName nVarChar(100) not null,
  MajorRanking int not null
);

# Create Views
Create
View vSchoolDetail
as
  Select SchoolID,
         SchoolName,
         SchoolWebsite,
         PhoneNumber,
         SchoolSize,
         GenderRestriction,
         SchoolType,
         SchoolLocation,
         SchoolEnvironment,
         StudentFacultyRatio,
         AcceptanceRate
  From SchoolDetail;

Create
View vSchoolTag
as
  Select TagID,
         SchoolID,
         TagDesc
  From SchoolTag;

Create
View vTestDetail
as
  Select TestID,
         SchoolID,
         TestName,
         ScoreLowerBound,
         ScoreUpperBound
  From TestDetail;

Create
View vApplicationDetail
as
  Select ApplicationID,
         SchoolID,
         ApplicationName
  From ApplicationDetail;

Create
View vTuitionDetail
as
  Select TuitionID,
         SchoolID,
         InStateCost,
         OutStateCost
  From TuitionDetail;

Create
View vTuitionToIncome
as
  Select IncomeID,
         SchoolID,
         RangeLowerBound,
         RangeUpperBound,
         Tuition
  From TuitionToIncome;

Create
View vSchoolRanking
as
  Select RankingID,
         SchoolID,
         MajorName,
         MajorRanking
  From SchoolRanking;

