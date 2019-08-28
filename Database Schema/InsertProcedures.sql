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
use HorizanDB;
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
use HorizanDB;
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

use HorizanDB;

Create
Procedure pGetUser(
  In UFName VarChar(20),
  In ULName VarCHar(20),
  In UEmail VarChar(100),
  Out User_ID int
)
Begin 
  Set User_ID = (
    Select UserID 
    From UserDetail
    Where UserFirstName = UFName
    And UserLastName = ULName
    And UserEmail = UEmail
  );
End;

Use HorizanDB;
Create 
Procedure pGetCollection(
  Collection_Name VarChar(100),
  Out Collection_ID int
)
Begin 
  Set Collection_ID = (
    Select CollectionID 
    From CollectionDetail
    Where CollectionName = Collection_Name
  );
End;

Use HorizanDB;
Create 
Procedure pGetServey(
  In Servey_Name VarChar(100),
  Out Servey_ID int 
)
Begin
  Set Servey_ID = (
    Select ServeyID 
    From ServeyDetail
    Where ServeyName = Servey_Name
  );
end;

Use HorizanDB;
Create 
Procedure pGetServeyData(
  In Servey_ID int,
  In NLP_ID int,
  Out Servey_Data_ID int
)
Begin
  Set Servey_Data_ID = (
      Select ServeyDataID
      From ServeyData
      Where ServeyID = Servey_ID 
      and NLPID = NLP_ID
  );
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
Procedure pGetImage(
  In Image_Path VarChar(2000),
  Out Image_ID int
)
Begin
  Set Image_ID = (
    Select ImageID From ImageDetail
    Where ImagePath = Image_Path
  );
End;


Use HorizanDB;
Create 
Procedure pGetUserResponse(
  In File_Name varChar(200),
  out Response_ID int
)
begin 
  set Response_ID = (
    Select ResponseID from UserResponse
    where FileName = File_Name
  );
End;

Use HorizanDB;
/* drop procedure pInsSchoolMajorRankingSource; */
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
/* drop procedure pInsSchoolApplication; */
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

Use HorizanDB;
drop procedure pInsSchoolImage;
Create 
Procedure pInsSchoolImage(
  School_Name VarChar(255),
  Image_Name varChar(50),
  Image_Type varChar(20),
  Image_Path VarChar(2000)
)
Begin
  Declare School_ID int;
  Declare Image_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  call pGetImage(Image_Path, Image_ID);
  if Image_ID is not null
  then 
    SIGNAL  SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Image already in database';
  end if;

  Start Transaction;
  Insert into ImageDetail (ImageName, ImageType, ImagePath)
  values (Image_Name, Image_Type, Image_Path);
  Set Image_ID = LAST_INSERT_ID();
  Insert into SchoolImage (SchoolID, ImageID)
  values (School_ID, Image_ID);
  if @@error_count <> 0
  then 
    rollback;
  else 
    commit;
  end if;
end;

/*
  Usage: call pInsUserResponse(UserFirstName, UserLastName, UserEmail);
  Note: automatically assembles the name of JSON file on SQL to keep entry date accurate
*/
Use HorizanDB;
drop procedure PInsUserResponse;
Create 
Procedure pInsUserResponse(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100)
) 
Begin
  Declare User_ID int;
  Declare Entry_Date Datetime;
  Declare Final_File_Name VarChar(200);
  Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
  if User_ID is null
  then 
      SIGNAL SQLSTATE '45000'
      Set MESSAGE_TEXT = 'User not registered';
  end if;

  Set Entry_Date = Now();
  Set Final_File_Name = (Select (CONCAT(User_First_Name, User_Last_Name, User_Email, 'survey', Entry_Date, '.json')));
  Set Final_File_Name = replace(Final_File_Name, ' ', '');
  Insert into UserResponse(UserID, FileName, EntryDate)
  Values (User_ID, Final_File_Name, Entry_Date);
  if @@error_count <> 0
  then 
    rollback;
  else 
    commit;
  end if;
end;