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

    Start Transaction;
    Select s.SchoolName, s.AcceptanceRate, s.SchoolLocation, usc.MatchPercentage, i.ImagePath, i.ImageName
    from SchoolDetail s 
    join UserSchoolCollection usc on  s.SchoolID = usc.SchoolID
    join CollectionDetail c on s.CollectionID = c.CollectionID
    join SchoolImage si on s.SchoolID = si.SchoolID
    join ImageDetail i on i.ImageID = si.ImageID
    join UserDetail u on u.UserID = usc.UserID
    where c.CollectionName = 'Favorite'and u.UserID = User_ID and i.ImageType = "ThumbNail";
    if @@error_count <> 0
        Then 
        Rollback;
        else 
        Commit;
    end if;
end;

/*
    Stored procedure to get all matched schools
    SQL Code Usage:
        Call pGetMySchoolList(UserFirstName, UserLastName, UserEmail)
    returns a table with all matched school name, acceptance rate, 
    school location, match percentage, thumbnail image path and image name
*/
Use HorizanDB;
Create 
Procedure pGetMySchoolList (
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

    Start Transaction;
    Select s.SchoolName, s.AcceptanceRate, s.SchoolLocation, usc.MatchPercentage, i.ImagePath, i.ImageName
    from SchoolDetail s 
    join UserSchoolCollection usc on  s.SchoolID = usc.SchoolID
    join CollectionDetail c on s.CollectionID = c.CollectionID
    join SchoolImage si on s.SchoolID = si.SchoolID
    join ImageDetail i on i.ImageID = si.ImageID
    join UserDetail u on u.UserID = usc.UserID
    where u.UserID = User_ID and i.ImageType = "ThumbNail";
    if @@error_count <> 0
        Then 
        Rollback;
        else 
        Commit;
    end if;
End

/*
    Stored procedure to get servey list
    Usage:
        call pGetServeyList(UserFirstName, UserLastName, UserEmail)
    returns a tabel with user's servey names and the date it's takey
*/
Use HorizanDB;
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

    Start Transaction;
    Select s.ServeyName, su.EntryDate
    from ServeyDetail s 
    join ServeyUser su on s.ServeyID = su.ServeyID
    join UserDetail u on u.UserID = su.UserID
    where u.UserID = User_ID;
    if @@error_count <> 0
        Then 
        Rollback;
        else 
        Commit;
    end if;
End;

/*
    Stored procedure to get user information
    Usage:
        Call pGetUserProfile(UserFirstName, UserLastName, UserEmail)
    returns user's name, highest test score, date of entry for each score
*/

Use HorizanDB;
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

    Start Transaction;
    Select u.UserFirstName, u.UserLastName, Max(ut.score), ut.EntryDate, t.TestName
    from UserDetail u 
    join UserTest ut on u.UserID = ut.UserID
    join TestDetail t on ut.TestID = t.TestID
    Where u.UserID = User_ID 
    Group by t.TestID;
    if @@error_count <> 0
        Then 
        Rollback;
        else 
        Commit;
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
drop procedure pGetAllLists;
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

    Start Transaction;
    Select s.SchoolName, s.AcceptanceRate, s.SchoolLocation, uc.MatchPercentage,
    c.CollectionName, i.ImagePath, i.ImageName
    from SchoolDetail s 
    join UserCollege uc on uc.SchoolID = s.School_ID
    join UserSchoolCollection usc on  s.SchoolID = usc.SchoolID
    join CollectionDetail c on s.CollectionID = c.CollectionID
    join SchoolImage si on s.SchoolID = si.SchoolID
    join ImageDetail i on i.ImageID = si.ImageID
    join UserDetail u on u.UserID = usc.UserID
    where u.UserID = User_ID and i.ImageType = "ThumbNail";
    if @@error_count <> 0
        Then 
        Rollback;
        else 
        Commit;
    end if;
end;

/*
  get school information
  usage:
    call pGetSchoolInfo(userFirstName, userLastName, UserEmail, SchoolName)  
*/
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

    Start Transaction;
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
    and s.SchoolID = School_ID;
    if @@error_count <> 0
        Then 
        Rollback;
        else 
        Commit;
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


    if (Select CollectionID 
        from CollectionDetail 
        where CollectionName = Collection_Name) is not NULL
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'Duplicated Collection Name';
    end if;

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
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'Collection not found';
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
Create
Procedure pInsUserTest(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    Test_Name VarChar(50),
    Test_Score int,
    Entry_Date date
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