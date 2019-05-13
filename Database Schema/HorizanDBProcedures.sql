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
    Where UserID = User_ID 
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
    Select s.SchoolName, s.AcceptanceRate, s.SchoolLocation, usc.MatchPercentage, c.CollectionName, i.ImagePath, i.ImageName
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
end;

/*
    
*/
Use HorizanDB;
Create
Procedure pGetAllLists(
    User_First_Name VarChar(20),
    User_Last_Name VarChar(20),
    User_Email VarChar(100),
    School_Name VarChar(255)
) 
Begin
    Declare User_ID int;
    Call pGetUser(User_First_Name, User_Last_Name, User_Email, User_ID);
    if User_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'User not registered';
    end if;

    Declare School_ID int;
    Call pGetSchool(School_Name, SchoolID);
    if School_ID is null
    then 
        SIGNAL SQLSTATE '45000'
        Set MESSAGE_TEXT = 'School not found';
    end if;

    Start Transaction;
    Select s.SchoolName, s.AcceptanceRate, s.SchoolLocation, 
    usc.MatchPercentage, c.CollectionName, i.ImagePath, i.ImageName,
    s.SchoolWebsite, s.SchoolEnvironment, s.SchoolSize, s.StudentFacultyRatio, 
    s.PhoneNumber, s.SchoolType, sn.NLPRating, n.NLPCategory, a.ApplicationName,
    st.TuitionAmount, t.TuitionName, t.TuitionType, ste.ScoreUpBound, ste.ScoreLowerBound,
    te.TestName, sms.MajorRanking, m.MajorRankingName
    from SchoolDetail s 
    join UserSchoolCollection usc on  s.SchoolID = usc.SchoolID
    join CollectionDetail c on s.CollectionID = c.CollectionID
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
    where u.UserID = User_ID and t.TuitionName in ('in-state', 'out-state');
    and s.SchoolID = School_ID;
    if @@error_count <> 0
        Then 
        Rollback;
        else 
        Commit;
    end if;
end;