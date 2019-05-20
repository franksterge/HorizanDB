Use HorizanDB;
Create 
Function fCheckDuplicatedUser(U_Email varChar(100))
returns int 
begin 
    Declare UID int;
    set UID = (Select UserID from UserDetail
                    Where UserEmail = U_Email);
    if UID is NULL
    then 
        return 0;
    else 
        return 1;
    end if;
end 
