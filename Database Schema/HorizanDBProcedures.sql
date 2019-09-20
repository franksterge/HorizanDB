/*
    view to get all tips
    Usage:
        select * from vTips
*/
Use HorizanDB;
Create
View vTips as (
    Select t.TipTitle, t.TipDetail, i.ImageName, i.ImagePath
    from Tips t join ImageDetail i on t.ImageID = i.ImageID 
)

/*
  stored procedure to get all favorite colleges form user  
  Usage:
    Call pGetHomePageFavorites(UserFirstName, UserLastName, UserEmail)
    returns a table with favorited school name, acceptance rate, 
    school location, match percentage, thumbnail image path and image name
*/
Use HorizanDB;
drop Procedure pGetHomePageFavorites;
Create
Procedure pGetHomePageFavorites(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100)
) 
Begin
    Declare User_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not registered';
    end if;

    if @@error_count = 0
    then 
    create temporary table tempHome(
        Select s.SchoolName, s.AcceptanceRate, s.SchoolLocation, usc.MatchPercentage, i.ImagePath, i.ImageName
        from SchoolDetail s 
        join UserSchoolCollection usc on  s.SchoolID = usc.SchoolID
        join CollectionDetail c on s.CollectionID = c.CollectionID
        join SchoolImage si on s.SchoolID = si.SchoolID
        join ImageDetail i on i.ImageID = si.ImageID
        join UserDetail u on u.UserID = usc.UserID
        where c.CollectionName = 'Favorite'and u.UserID = User_ID and i.ImageType = "ThumbNail"
    );
    select * from tempHome;
    drop table tempHome;
    end if;
end;

/*
    Stored procedure to get servey list
    Usage:
        call pGetServeyList(UserFirstName, UserLastName, UserEmail)
    returns a tabel with user's servey names and the date it's takey
*/
Use HorizanDB;
drop Procedure pGetServeyList;
Create 
Procedure pGetServeyList (
    In User_First_Name VarChar(20),
    In User_Last_Name VarChar(20),
    In User_Email VarChar(100)
) 
Begin
    Declare User_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not registered';
    end if;

    if @@error_count = 0
    then 
    create temporary table tempServeyList(
        Select s.ServeyName, su.EntryDate
        from ServeyDetail s 
        join ServeyUser su on s.ServeyID = su.ServeyID
        join UserDetail u on u.UserID = su.UserID
        where u.UserID = User_ID
    );
    select * from tempServeyList;
    drop table tempServeyList;
    end if;
End;

/*
    Stored procedure to get user information
    Usage:
        Call pGetUserProfile(UserFirstName, UserLastName, UserEmail)
    returns user's name, highest test score, date of entry for each score
*/

Use HorizanDB;
drop procedure pGetUserProfile;
Create 
Procedure pGetUserProfile(
    In User_First_Name VarChar(20),
    In User_Last_Name VarChar(20),
    In User_Email VarChar(100)
)
Begin
    Declare User_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not registered';
    end if;

    if @@error_count = 0
    then 
    create temporary table tempUserProfile(
        Select u.UserFirstName, u.UserLastName, Max(ut.score), ut.EntryDate, t.TestName
        from UserDetail u 
        join UserTest ut on u.UserID = ut.UserID
        join TestDetail t on ut.TestID = t.TestID
        Where u.UserID = User_ID
    );
    select * from tempUserProfile;
    drop table tempUserProfile;
    end if;
End;

/*
  stored procedure to get colleges from each of the user's list
  Usage:
    Call pGetAllLists(UserFirstName, UserLastName, UserEmail)
    returns a table with school name, acceptance rate, 
    school location, match percentage, thumbnail image path and image name
*/
Use HorizanDB;
Create
Procedure pGetAllLists(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100)
) 
Begin
    Declare User_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not registered';
    end if;

    if @@error_count = 0
    then 
    create temporary table tempAllList(
        Select s.SchoolName, s.AcceptanceRate, s.SchoolLocation, uc.MatchPercentage,
        c.CollectionName, i.ImagePath, i.ImageName
        from SchoolDetail s 
        join UserCollege uc on uc.SchoolID = s.School_ID
        join UserSchoolCollection usc on  s.SchoolID = usc.SchoolID
        join CollectionDetail c on s.CollectionID = c.CollectionID
        join SchoolImage si on s.SchoolID = si.SchoolID
        join ImageDetail i on i.ImageID = si.ImageID
        join UserDetail u on u.UserID = usc.UserID
        where u.UserID = User_ID and i.ImageType = "ThumbNail"
    );
    select * from tempAllList;
    end if;
end;

/*
  get school information
  usage:
    call pGetSchoolInfo(userFirstName, userLastName, UserEmail, SchoolName)  
*/
--rewrite
Use HorizanDB;
Create
Procedure pGetSchoolInfo(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    School_Name VarChar(255)
) 
Begin
    Declare User_ID int;
    Declare School_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;

    Call pGetSchool(School_Name, School_ID);
    If School_ID is null 
    then 
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid School name';
    End if;

    if @@error_count = 0
    then 
    create temporary table tempSchoolInfo(
        Select s.SchoolName, s.AcceptanceRate, s.SchoolLocation, 
        uc.MatchPercentage, c.CollectionName, i.ImagePath, i.ImageName,
        s.SchoolWebsite, s.SchoolEnvironment, s.SchoolSize, s.StudentFacultyRatio, 
        s.PhoneNumber, s.SchoolType, sn.NLPRating, n.NLPCategory, a.ApplicationName,
        st.TuitionAmount, t.TuitionName, t.TuitionType, ste.ScoreUpBound, ste.ScoreLowerBound,
        te.TestName, sms.MajorRanking, m.MajorRankingName
        from SchoolDetail s 
        join UserCollege uc on s.SchoolID = uc.SchoolID
        join UserSchoolCollection usc on  s.SchoolID = usc.SchoolID
        join CollectionDetail c on usc.CollectionID = c.CollectionID
        join SchoolImage si on s.SchoolID = si.SchoolID
        join ImageDetail i on i.ImageID = si.ImageID
        join UserDetail u on u.UserID = usc.UserID
        join SchoolNLP sn on sn.SchoolID = s.SchoolID
        join NLPData n on n.NLPID = sn.NLPID
        join SchoolApplication sa on sa.SchoolID = sa.SchoolID
        join ApplicationDetail a on a.ApplicationID = sa.ApplicationID
        join SchoolTuition st on st.SchoolID = s.SchoolID
        join TuitionDetail t on t.TuitionID = st.TuitionID
        join SchoolTest ste on ste.SchoolID = s.SchoolID
        join TestDetail te on te.TestID = ste.TestID
        join SchoolMajorRankingSource sms on sms.SchoolID = s.SchoolID
        join MajorRanking m on m.MajorRankingID = sms.MajorRankingID
        where u.UserID = User_ID and t.TuitionName in ('in-state', 'out-state')
        and s.SchoolID = School_ID
    );
    select * from tempSchoolInfo;
    end if;
end;

/*
    Adds user to the UserDetial Table with given firstname, latname and email
    usage:
        call pInsUserDetail(userFirstName, userLastName, UserEmail)
*/
Use HorizanDB;
Create
Procedure pInsUserDetail(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100)
) 
Begin
    Declare User_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    start Transaction;
    if User_ID is null
    then
        Insert into UserDetail (UserFirstName, UserLastName, UserEmail)
        values (User_First_Name, User_Last_Name, User_Email);
    else 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User already exists';
    end if;
    
    call pInsUserCollection(User_First_Name, User_Last_Name, User_Email, 'Favorite');
    call pInsUserCollection(User_First_Name, User_Last_Name, User_Email, 'Dream School');
    call pInsUserCollection(User_First_Name, User_Last_Name, User_Email, 'Reach School');
    call pInsUserCollection(User_First_Name, User_Last_Name, User_Email, 'Safety School');
    if @@error_count <> 0
    Then 
        Rollback;
    else 
        Commit;
    end if;
end;

/*
    Insert a new collction for the given user
    Usage:
        call pInsUserCollction(UserFirstName, UserLastName, UserEmail, CollectionName)
*/
Use HorizanDB;
drop procedure pInsUserCollection;
Create 
Procedure pInsUserCollection(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    Collection_Name VarChar(100)
)
Begin
    Declare User_ID int;
    Declare Collection_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;

    Call pGetCollection(Collection_Name, Collection_ID);
    Start Transaction;
    if Collection_ID is null
    then 
        Insert Into CollectionDetail(CollectionName)
        values (Collection_Name);
        Set Collection_ID = (Select last_insert_id());
    end if;
    Insert Into UserSchoolCollection(UserID, CollectionID) 
    values (User_ID, Collection_ID);
    If @@error_count <> 0
    THEN
        ROLLBACK;
    Else 
        Commit;
    End if;
End;

/*
    Inserts a school into a specified user's collection
    Usage: 
        call pinsSchoolToUserCollection(UserFirstName, UserLastName, UserEmail, CollectionName, school name);
*/
Use HorizanDB;
drop procedure pInsSchoolToUserCollection;
Create 
Procedure pInsSchoolToUserCollection(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    School_Name VarChar(255),
    Collection_Name VarChar(20)
)
Begin
    Declare User_ID int;
    Declare Collection_ID int;
    Declare School_ID int;

    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;

    Call pGetCollection(Collection_Name, Collection_ID);
    if Collection_ID is null 
    then 
        Call pInsUserCollection(User_First_Name, User_Last_Name, User_Email, Collection_Name);
    end if;

    Call pGetSchool(School_Name, SchooL_ID);
    if School_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    Start TRANSACTION;
    Insert into UserSchoolCollection (UserID, SchoolID, CollectionID)
    values (User_ID, School_ID, Collection_ID);
    If @@error_count <> 0
    then 
        Rollback;
    else 
        commit;
    End if;
end;

/*
    Insert an exam for a user
    usage:
        call pInsUserTest(serFirstName, UserLastName, UserEmail, TestName, Score, EntryDate);
*/
Use HorizanDB;
drop procedure pInsUserTest;
Create
Procedure pInsUserTest(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    Test_Name VarChar(50),
    Test_Score int,
    Entry_Date datetime
)
begin
    Declare User_ID int;
    Declare Test_ID int;
    if Entry_Date is null
    then 
        Set Entry_Date = Now();
    end if;

    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;

    Call pGetTestDetail(Test_Name, Test_ID);
    if Test_ID is null  
    then 
        Insert into TestDetail(TestName)
        values (Test_Name);
        Set Test_ID = (Select last_insert_id());
    end if;

    Start Transaction;
    Insert into UserTest(UserID, TestID, Score, EntryDate)
    values (User_ID, Test_ID, Test_Score, Entry_Date);
    if @@error_count <> 0
    then 
        Rollback;
    else 
        commit;
    end if;
end;

/*
    insert User's score to a known servey
*/
Use HorizanDB;
Create 
Procedure pInsUserServeyData(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    Servey_Name VarChar(100),
    NLP_Category VarChar(20),
    NLP_Score float
)
Begin
    Declare NLP_ID int;
    Declare User_ID int;
    Declare Servey_ID int;
    Declare Servey_Data_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;

    Call pGetNLP(NLP_Category, NLP_ID);
    If NLP_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'Invalid NLP Category';
    End if;

    Call pGetServey(Servey_Name, Servey_ID);
    if Servey_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'Servey not found';
    end if;

    Call pGetServeyData(Servey_ID, NLP_ID, Servey_Data_ID);
    if Servey_Data_ID is null 
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'No valid Category-servey match';
    end if;
  Start TRANSACTION;
  Insert Into ServeyData(SchoolID, NLPID, NLPRating)
  Values (School_ID, NLP_ID, NLP_Score);
  If @@error_count <> 0
  Then 
    Rollback;
  Else
    Commit;
  End if;
End;

/*
    Creates a new servey for the given user, date of creation = date current entrydate
    usage:
        call pInsUserServey(UserFirstName, UserLastName, UserEmail, Servey_Name)
*/
Use HorizanDB;
Create 
Procedure pInsUserServey(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    Servey_Name VarChar(100),
    Entry_Date date
)
Begin
    Declare User_ID int;
    Declare Servey_ID int;

    if Entry_Date is null
    then 
        Set Entry_Date = (Now());
    end if;

    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;

    Start Transaction;
    Insert into ServeyDetail(ServeyName) values (Servey_Name);
    Set Servey_ID = (Select last_insert_id());
    Insert into UserServey(UserID, ServeyID, EntryDate)
    values (User_ID, Servey_ID, EntryDate);
    if @@error_count <> 0
    then 
        Rollback;
    else 
        commit;
    end if;
end;

/* 
    get major rankings of the given school
 */
use HorizanDB;
drop Procedure pGetSchoolMajorRanking;
Create
Procedure pGetSchoolMajorRanking(
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    if @@error_count = 0
    then
        create temporary table tempRanking(
            Select m.MajorRankingName, sms.MajorRanking
            from SchoolDetail s
            join SchoolMajorRankingSource sms on s.SchoolID = sms.SchoolID
            join MajorRanking m on sms.MajorRankingID = m.MajorRankingID
            where s.SchoolID = School_ID
        );
        Select * from tempRanking;
        drop table tempRanking;
    end if;
end;

/* 
    get all school detail information
*/
use HorizanDB;
drop Procedure pGetSchoolDetail;
Create
Procedure pGetSchoolDetail(
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    if @@error_count = 0
    then
        create temporary table tempDetail(
            Select  SchoolID, SchoolName, SchoolLocation, SchoolEnvironment,
            SchoolSize, StudentFacultyRatio, SchoolType, AcceptanceRate
            from SchoolDetail 
            where SchoolID = School_ID
        );
        Select * from tempDetail;
        drop table tempDetail;
    end if;
end;

/* 
get test info of given school
 */
use HorizanDB;
drop procedure pGetSchoolTest;
Create
Procedure pGetSchoolTest(
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    if @@error_count = 0
    then
        create temporary table tempTest(
            Select t.TestName, st.ScoreUpperBound, st.ScoreLowerBound
            from SchoolDetail s
            join SchoolTest st on s.SchoolID = st.SchoolID
            join TestDetail t on t.TestID = st.TestID
            where s.SchoolID = School_ID
        );
        Select * from tempTest;
        drop table tempTest;
    end if;
end;


--TODO:ADD SCHOOL APPLICATION PROCEDURE
/* 
    get application info of given school
 */
use HorizanDB;
drop procedure pGetSchoolApplication;
Create
Procedure pGetSchoolApplication(
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    if @@error_count = 0
    then
        create temporary table tempApp(
            Select a.ApplicationName
            from SchoolDetail s
            join SchoolApplication sa on s.SchoolID = sa.SchoolID
            join ApplicationDetail a on a.ApplicationID = sa.ApplicationID
            where s.SchoolID = School_ID
        );
        Select * from tempApp;
        drop table tempApp;
    end if;
end;

use HorizanDB;
drop procedure pGetSchoolNLP;
Create
Procedure pGetSchoolNLP(
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    if @@error_count = 0
    then
        create temporary table tempnlp(
            Select n.NLPCategory, sn.NLPRating
            from SchoolDetail s
            join SchoolNLP sn on s.SchoolID = sn.SchoolID
            join NLPData n on n.NLPID = sn.NLPID
            where s.SchoolID = School_ID
        );
        Select * from tempnlp;
        drop table tempnlp;
    end if;
end;

use HorizanDB;
drop procedure pGetSchoolTuition;
Create
Procedure pGetSchoolTuition(
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    if @@error_count = 0
    then
        create temporary table tempTuition(
            Select t.TuitionName, st.TuitionAmount
            from SchoolDetail s
            join SchoolTuition st on s.SchoolID = st.SchoolID
            join TuitionDetail t on t.TuitionID = st.TuitionID
            where s.SchoolID = School_ID
            and  t.TuitionName in ('in-state', 'out-state')
        );
        Select * from tempTuition;
        drop table tempTuition;
    end if;
end;

drop procedure pGetSchoolIncomeSpecificTuition;
use HorizanDB;
Create
Procedure pGetSchoolIncomeSpecificTuition(
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    if @@error_count = 0
    then
        create temporary table tempTuition(
            Select t.TuitionType, st.TuitionAmount
            from SchoolDetail s
            join SchoolTuition st on s.SchoolID = st.SchoolID
            join TuitionDetail t on t.TuitionID = st.TuitionID
            where s.SchoolID = School_ID
            and  t.TuitionName = 'general'
        );
        Select * from tempTuition;
        drop table tempTuition;
    end if;
end;

use HorizanDB;
drop procedure pGetSchoolLogo;
Create
Procedure pGetSchoolLogo(
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    if @@error_count = 0
    then
        create temporary table tempImage(
            Select i.ImagePath
            from SchoolDetail s
            join SchoolImage si on s.SchoolID = si.SchoolID
            join ImageDetail i on i.ImageID = si.ImageID
            where s.SchoolID = School_ID
            and  i.ImageType = 'Logo'
        );
        Select * from tempImage;
        drop table tempImage;
    end if;
end;

use HorizanDB;
drop procedure pGetSchoolGeneralImage;
Create
Procedure pGetSchoolGeneralImage(
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    if @@error_count = 0
    then
        create temporary table tempImage(
            Select distinct i.ImagePath
            from SchoolDetail s
            join SchoolImage si on s.SchoolID = si.SchoolID
            join ImageDetail i on i.ImageID = si.ImageID
            where s.SchoolID = School_ID
            and  i.ImageType = 'General'
        );
        Select * from tempImage;
        drop table tempImage;
    end if;
end;

Use HorizanDB;
Create 
Procedure pGetUserCollection(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100)
)
begin 
    Declare User_ID int;

    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;
    
    if @@error_count = 0
    then 
        create temporary table tempCollection(
            Select distinct c.CollectionName, c.CollectionDesc
            from CollectionDetail c
            join UserSchoolCollection usc on c.CollectionID = usc.CollectionID
            join UserDetail u on u.UserID = usc.UserID
            where u.UserID = User_ID
        );
        Select * from tempCollection;
        drop table tempCollection;
    end if;
end;

Use HorizanDB;
drop procedure pGetUserCollectionDetail;
Create 
Procedure pGetUserCollectionDetail(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    Collection_Name VarChar(100)
)
begin 
    Declare User_ID int;
    Declare Collection_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;
    
    Call pGetCollection(Collection_Name, Collection_ID);
    if Collection_ID is null 
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'Collection not found';
    end if;


    if @@error_count = 0
    then 
        create temporary table tempCollection(
            Select distinct s.SchoolName
            from CollectionDetail c
            join UserSchoolCollection usc on c.CollectionID = usc.CollectionID
            join UserDetail u on u.UserID = usc.UserID
            join SchoolDetail s on s.SchoolID = usc.SchoolID
            where u.UserID = User_ID and c.CollectionID = Collection_ID
        );
        Select * from tempCollection;
        drop table tempCollection;
    end if;
end;

/*
    Get list of all json files for the given user
*/
Use HorizanDB;
drop procedure pGetUserResponses;
Create 
Procedure pGetUserResponses(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100)
)
begin 
    Declare User_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;

    if @@error_count = 0
    then 
        create temporary table tempResponse(
            Select r.FileName
            from UserResponse r
            join UserDetail u on u.UserID = r.UserID
            where u.UserID = User_ID
        );
        Select * from tempResponse;
        drop table tempResponse;
    end if;
end;

Use HorizanDB;
Create View vGetAllSchoolNames as (
    Select distinct SchoolName from SchoolDetail
);

/*
    Stored procedure to get all matched schools
    SQL Code Usage:
        Call pGetUserMatchPercentage(UserFirstName, UserLastName, UserEmail, FileName)
    returns a table with all matched school name and match percentage
*/
Use HorizanDB;
drop Procedure pGetUserMatchPercentage;
Create 
Procedure pGetUserMatchPercentage (
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    File_Name VarChar(200)
) 
Begin
    Declare User_ID int;
    Declare File_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not registered';
    end if;

    Call pGetUserResponse(File_Name, File_ID);
    if File_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'File not found';
    end if;

    if @@error_count = 0
    then 
    create temporary table tempSchoolList(
        Select s.SchoolName, uc.MatchPercentage
        from SchoolDetail s 
        Join UserCollege uc on s.SchoolID = uc.SchoolID
        Join UserResponse ur on uc.ResponseID = ur.ResponseID
        Where uc.UserID = User_ID and ur.ResponseID = File_ID
    );
    select * from tempSchoolList;
    drop table tempSchoolList;
    end if;
End


/* 
    get school name, location, school type, and the LATEST match percentage for the given user 
    of the given school
    usage: 
        call pGetSchoolSummary(User first name, user last name, user email, school name)
    Note:
        this procedure only returns the matching result from the LATEST survey
 */
Use HorizanDB;
drop Procedure pGetSchoolSummary;
Create
Procedure pGetSchoolSummary(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Declare User_ID int;
    Declare Response_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not registered';
    end if;

    Call pGetLatestUserResponse(User_ID, Response_ID);
    if Response_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'Current user was not matched in the past with the  given school';
    end if;

    if @@error_count = 0
    then
        create temporary table tempSummary(
            Select  s.SchoolName, s.SchoolLocation, s.SchoolType, uc.MatchPercentage, i.ImagePath 
            from SchoolDetail s
            join UserCollege uc on s.SchoolID = uc.SchoolID
            join SchoolImage si on s.SchoolID = si.SchoolID
            join ImageDetail i on i.ImageID = si.ImageID
            where s.SchoolID = School_ID 
            and uc.UserID = User_ID
            and uc.ResponseID = Response_ID
            and i.ImageType = 'Logo'
        );
        Select * from tempSummary;
        drop table tempSummary;
    end if;
end;



drop Procedure pGetSchoolSummary;
Use HorizanDB;
Create
Procedure pGetSchoolSummaryNoUser(
    School_Name VarChar(255)
)
begin
    Declare School_ID int;
    Call pGetSchool (School_Name, School_ID);
    if School_ID is null
    then
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    if @@error_count = 0
    then
        create temporary table tempSummary(
            Select  s.SchoolName, s.SchoolLocation, s.SchoolType, i.ImagePath 
            from SchoolDetail s
            join SchoolImage si on s.SchoolID = si.SchoolID
            join ImageDetail i on i.ImageID = si.ImageID
            where s.SchoolID = School_ID 
            and i.ImageType = 'Logo'
        );
        Select * from tempSummary;
        drop table tempSummary;
    end if;
end;

/*
    Usage: call pRmSchoolFromUserCollection(UserFirstName, UserLastName, UserEmail, SchoolName, CollectionName)

*/
drop procedure pRmSchoolFromUserCollection;
Use HorizanDB;
Create 
Procedure pRmSchoolFromUserCollection(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    School_Name VarChar(255),
    Collection_Name VarChar(20)
)
Begin
    Declare User_ID int;
    Declare Collection_ID int;
    Declare School_ID int;

    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;

    Call pGetCollection(Collection_Name, Collection_ID);
    if Collection_ID is null 
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not found';
    end if;

    Call pGetSchool(School_Name, SchooL_ID);
    if School_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    Start TRANSACTION;
    Delete from UserSchoolCollection
    where UserID = User_ID and CollectionID = CollectionID and SchoolID = School_ID;
    If @@error_count <> 0
    then 
        Rollback;
    else 
        commit;
    End if;
end;