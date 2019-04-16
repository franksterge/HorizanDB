Drop DATABASE  HorizanDB;
Create Database HorizanDB;

Use HorizanDB;

--  create tables
Create
Table SchoolDetail (
  SchoolID int AUTO_INCREMENT primary key not null,
  SchoolName nVarCHar(255) not null,
  SchoolWebsite nVarChar(255) not null,
  PhoneNumber nVarChar(14) not null,
  SchoolSize int not null,
  GenderRestriction nVarChar(100) not null default 'Co-ed',
  SchoolType nVarChar(100) not null,
  SchoolLocation nVarChar(100) not null,
  SchoolEnvironment nVarChar(100) not null,
  StudentFacultyRatio int not null,
  AcceptanceRate nVarChar(4) not null
);

Create
Table SchoolTag (
  SchoolTagID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  TagsID int not null REFERENCES Tag(TagID)
);

Create 
Table Tags (
  TagID int AUTO_INCREMENT primary key not null,
  TagName nVarChar(50) not null,
  TagDesc nVarChar(100) not null 
);

Create
Table SchoolTest(
  SchoolTestID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  TestID int not null REFERENCES TestDetail(TestID),
  ScoreUpBound int null,
  ScoreLowerBound int not null
);

Create
Table TestDetail (
  TestID int AUTO_INCREMENT primary key not null,
  TestName nVarChar(50) not null,
  TestDesc nVarChar(100) null
);

Create
Table SchoolApplication(
  SchoolApplicationID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  ApplicationID int not null REFERENCES ApplicationDetail(ApplicationID),
  DueDate date not null
);
--  if application is not presented on the table then it's unavailable
Create
Table ApplicationDetail (
  ApplicationID int AUTO_INCREMENT primary key not null,
  ApplicationName nVarChar(50) not null,
  ApplicationDesc nVarChar(100) not null
);

Create
Table SchoolTuition(
  SchoolTuitionID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  TuitionID int not null REFERENCES TuitionDetail(TuitionID),
  TuitionAmount int not null
);
/*
  tuition name: general/in-state/out-state
  tuition type: general/income-specific
*/
Create
Table TuitionDetail (
  TuitionID int AUTO_INCREMENT primary key not null,
  TuitionName nVarChar(50) not null, 
  TuitionType nVarChar(50) not null, 
  IncomeRangeUpperBound int null,
  IncomeRangeLowerBound int not null default 0
);

Create 
Table SchoolMajorRankingSource(
  SchoolMajorRankingSourceID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  MajorRankingID int not null REFERENCES MajorRanking(MajorRankingID),
  SourceID int not null REFERENCES RankingSource(SourceID),
  MajorRanking int not null,
  SourceLink nVarChar(100) not null
);

Create 
Table MajorRanking(
  MajorRankingID int AUTO_INCREMENT primary key not null,
  MajorRankingName nVarChar(50) not null,
  MajorRankingDescription nVarChar(100) null
);

Create
Table RankingSource(
  SourceID int AUTO_INCREMENT primary key not null,
  SourceName nVarChar(50) not null,
  SourceLink nVarChar(100) not null
);


-- # Create Views
