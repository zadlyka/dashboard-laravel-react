<?php

namespace App\Enums;

enum Permission: string
{
    case Manage_All = "0";

    case Manage_Role = "100";
    case Create_Role = "101";
    case Read_Role = "102";
    case Update_Role = "103";
    case Delete_Role = "104";

    case Manage_User = "200";
    case Create_User = "201";
    case Read_User = "202";
    case Update_User = "203";
    case Delete_User = "204";

    case Manage_Category = "300";
    case Create_Category = "301";
    case Read_Category = "302";
    case Update_Category = "303";
    case Delete_Category = "304";
}
