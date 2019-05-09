Drop DATABASE  HorizanDB;
Create Database HorizanDB;

Use HorizanDB;

Create
Table SchoolDetail (
  SchoolID int AUTO_INCREMENT primary key not null,
  SchoolName VarChar(255) not null,
  SchoolWebsite VarChar(255) not null,
  PhoneNumber VarChar(14) not null,
  SchoolSize int not null,
  GenderRestriction VarChar(100) not null default 'Co-ed',
  SchoolType VarChar(100) not null,
  SchoolLocation VarChar(100) not null,
  SchoolEnvironment VarChar(100) not null,
  StudentFacultyRatio int not null,
  AcceptanceRate VarChar(4) not null
);

Create 
Table Tags (
  TagID int AUTO_INCREMENT primary key not null,
  TagName VarChar(50) not null,
  TagDesc VarChar(100) not null 
);

Create
Table SchoolTag (
  SchoolTagID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  TagID int not null,
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign Key (TagID) REFERENCES Tags(TagID)
);

Create
Table TestDetail (
  TestID int AUTO_INCREMENT primary key not null,
  TestName VarChar(50) not null,
  TestDesc VarChar(100) null
);
use HorizanDB;
Create
Table SchoolTest(
  SchoolTestID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  TestID int not null,
  ScoreUpBound int null,
  ScoreLowerBound int not null,
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign Key (TestID) REFERENCES TestDetail(TestID)
);
use HorizanDB;

Create 
Table ApplicationDetail (
  ApplicationID int AUTO_INCREMENT primary key not null,
  ApplicationName VarChar(50) not null,
  ApplicationDesc VarChar(100) not null,
  ApplicationLink VarChar(500) not null
);
use HorizanDB;
drop table SchoolApplication;
Create
Table SchoolApplication(
  SchoolApplicationID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  ApplicationID int not null,
  Foreign Key (SchoolID)REFERENCES SchoolDetail(SchoolID),
  Foreign Key (ApplicationID) REFERENCES ApplicationDetail(ApplicationID)
);


/*
  tuition name: general/in-state/out-state
  tuition type: general/income-specific
*/
Create
Table TuitionDetail (
  TuitionID int AUTO_INCREMENT primary key not null,
  TuitionName VarChar(50) not null, 
  TuitionType VarChar(50) not null, 
  IncomeRangeUpperBound int null,
  IncomeRangeLowerBound int not null default 0
);
use HorizanDB;
Create
Table SchoolTuition(
  SchoolTuitionID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  TuitionID int not null,
  TuitionAmount int not null,
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign Key (TuitionID) REFERENCES TuitionDetail(TuitionID)
);

Create 
Table MajorRanking(
  MajorRankingID int AUTO_INCREMENT primary key not null,
  MajorRankingName VarChar(50) not null,
  MajorRankingDescription VarChar(100) null
);
use HorizanDB;
drop table RankingSource;
Create
Table RankingSource(
  SourceID int AUTO_INCREMENT primary key not null,
  SourceName VarChar(50) not null,
  SourceLink VarChar(500) not null
);

use HorizanDB;
Create 
Table SchoolMajorRankingSource(
  SchoolMajorRankingSourceID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  MajorRankingID int not null,
  SourceID int not null,
  MajorRanking int not null,
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign Key (MajorRankingID) REFERENCES MajorRanking(MajorRankingID),
  Foreign Key (SourceID) REFERENCES RankingSource(SourceID)
);


use HorizanDB;
Select count(*) from SchoolNLP;
Create 
Table SchoolNLP(
  SchoolNLPID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  NLPID int not null REFERENCES NLPData(NLPID),
  NLPRating float not null
);

Create
Table NLPData(
  NLPID int AUTO_INCREMENT primary key not null,
  NLPCategory VarChar(20) not null
);

/*
--Create stored procedure to lookup+insert data
*/
Use HorizanDB;

Create 
Procedure pGetSchool(
  In S_Name VarChar(255),
  Out School_ID Int)
Begin
  Set School_ID = (Select SchoolID 
   From SchoolDetail 
   where SchoolName = S_Name
  );
End;

Create
Procedure pGetMajorRanking(
  In rankingName VarChar(50),
  Out rankingID Int)
Begin
  Set rankingID = (
    Select MajorRankingID
    From MajorRanking
    Where MajorRankingName = rankingName
  );
End;
Use HorizanDB;
Drop Procedure pGetRankingSource;
Create 
Procedure pGetRankingSource(
  In SName Varchar(50),
  Out Source_ID Int)
Begin
  Set Source_ID = (
    Select SourceID
    From RankingSource
    Where SourceName = SName
  );
End;

Create 
Procedure pGetTestDetail(
  In TName VarChar(50),
  Out Test_ID Int)
Begin
  Set Test_ID = (
    Select TestID 
    From TestDetail
    Where TestName = TName
  );
End;

Create 
Procedure pGetTag(
  In TName VarChar(50),
  Out Tag_ID Int)
Begin
  Set Tag_ID = (
    Select TagID
    From Tags
    Where TagName = TName
  );
End;

Create 
Procedure pGetApp(
  In AppName VarChar(50),
  Out AppID Int)
Begin
  Set AppID = (
    Select ApplicationID
    From ApplicationDetail
    Where ApplicationName = AppName
  );
End;

Create 
Procedure pGetTuition(
  In TName VarChar(50),
  In TType VarChar(50),
  Out Tuition_ID Int)
Begin
  Set Tuition_ID = (
    Select TuitionID
    From TuitionDetail
    Where TuitionName = TName
    And TuitionType = TType
  );
End;

Use HorizanDB;
drop procedure pInsSchoolMajorRankingSource;
Create
Procedure pInsSchoolMajorRankingSource(
  In School_Name VarChar(255),
  In R_Name VarChar(50),
  In Source_Name VarChar(50),
  In Ranking Int
)
Begin
  Declare School_ID Int;
  Declare Ranking_ID Int;
  Declare Source_ID Int;
  
  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetMajorRanking(R_Name, Ranking_ID);
  If Ranking_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT =  'Invalid ranking name';
  End if;

  Call pGetRankingSource(Source_Name, Source_ID);
  If Source_ID is null
  then
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid Source name';
  End if;

  START TRANSACTION;
  Insert Into SchoolMajorRankingSource(SchoolID, MajorRankingID, SourceID, MajorRanking)
  Values (School_ID, Ranking_ID, Source_ID, Ranking);
  If @@error_count <> 0
  Then
    Rollback;
  Else 
    Commit;
  End if;
End;


use HorizanDB;
drop table SchoolTest;
Create 
Procedure pInsSchoolTest(
  School_Name VarChar(255),
  Test_Name VarChar(50),
  Score_Up_Bound int,
  Score_Lower_Bound int
)
Begin
  Declare School_ID int;
  Declare Test_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetTestDetail(Test_Name, Test_ID);
  If Test_ID is null
  then
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid Test name';
  End if;

  START TRANSACTION;
  Insert Into SchoolTest(SchoolID, TestID, ScoreUpBound, ScoreLowerBound)
  Values (School_ID, Test_ID, Score_Up_Bound, Score_Lower_Bound);
  If @@error_count <> 0
  Then
    Rollback;
  Else 
    Commit;
  End if;
End;

Create 
Procedure pInsSchoolTag(
  School_Name VarChar(255),
  Tag_Name VarChar(50)
)
Begin
  Declare School_ID int;
  Declare Tag_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetTag(Tag_Name, Tag_ID);
  If Tag_ID is null
  then
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid Tag name';
  End if;

  START TRANSACTION;
  Insert Into SchoolTag(SchoolID, TagID)
  Values (School_ID, Tag_ID);
  If @@error_count <> 0
  Then
    Rollback;
  Else 
    Commit;
  End if;
End;
use HorizanDB;
Create 
Procedure pInsSchoolTuition(
  School_Name VarChar(255),
  Tuition_Name VarChar(50),
  Tuition_Type VarChar(50),
  Tuition_Amount int
)
Begin
  Declare School_ID int;
  Declare Tuition_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetTuition(Tuition_Name, Tuition_Type, Tuition_ID);
  If Tuition_ID is null
  then
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid Tuition name';
  End if;

  START TRANSACTION;
  Insert Into SchoolTuition(SchoolID, TuitionID, TuitionAmount)
  Values (School_ID, Tuition_ID, Tuition_Amount);
  If @@error_count <> 0
  Then
    Rollback;
  Else 
    Commit;
  End if;
End;
use HorizanDB;
drop procedure pInsSchoolApplication;
Create 
Procedure pInsSchoolApplication(
  School_Name VarChar(255),
  Application_Name VarChar(50)
)
Begin
  Declare School_ID int;
  Declare Application_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetApp(Application_Name, Application_ID);
  If Application_ID is null
  then
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid Application name';
  End if;

  START TRANSACTION;
  Insert Into SchoolApplication(SchoolID, ApplicationID)
  Values (School_ID, Application_ID);
  If @@error_count <> 0
  Then
    Rollback;
  Else 
    Commit;
  End if;
End;
Create 
Procedure pGetNLP(
  In NLP_Category VarChar(20),
  Out NLP_ID int)
Begin
  Set NLP_ID = (
    Select NLPID From NLPData
    Where NLPCategory = NLP_Category
  );
End;
Use HorizanDB;
Create 
Procedure pInsSchoolNLPData(
  School_Name VarChar(255),
  NLP_Category VarChar(20),
  NLP_Rating float
)
Begin
  Declare School_ID int;
  Declare NLP_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null
  then
    SIGNAL SQLSTATE '45000'
    Set MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetNLP(NLP_Category, NLP_ID);
  If NLP_ID is null
  then 
    SIGNAL SQLSTATE '45000'
    Set MESSAGE_TEXT = 'Invalid NLP Category';
  End if;

  Start TRANSACTION;
  Insert Into SchoolNLP(SchoolID, NLPID, NLPRating)
  Values (School_ID, NLP_ID, NLP_Rating);
  If @@error_count <> 0
  Then 
    Rollback;
  Else
    Commit;
  End if;
End;