from exchangelib import DELEGATE, Credentials, Account, Folder, CalendarItem
from exchangelib.folders import Calendar
from exchangelib.folders import Root
import datetime

credentials = Credentials(
    username='iSchoolCheckIn@rit.edu',
    password='Iste501SeniorDev'
)

account = Account(
    primary_smtp_address='iSchoolCheckIn@rit.edu',
    credentials=credentials,
    autodiscover=True,
    access_type=DELEGATE
)

cal_items=CalendarItem(folder=account.calendar)

print(cal_items)