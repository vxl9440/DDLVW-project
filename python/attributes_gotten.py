import datetime
import inspect
from pprint import pprint
from exchangelib import Account, CalendarItem, Credentials
from exchangelib.items import MeetingRequest, MeetingCancellation, \
  SEND_TO_ALL_AND_SAVE_COPY

credentials = Credentials(
    username='iSchoolCheckIn@rit.edu',
    password='Iste501SeniorDev'
)
a = Account(
    primary_smtp_address='iSchoolCheckIn@rit.edu',
    credentials=credentials,
    autodiscover=True,
    # access_type=DELEGATE
)
start = datetime.datetime(2017, 1, 1, tzinfo=a.default_timezone)
end = datetime.datetime(2018, 1, 1, tzinfo=a.default_timezone)

x = 0
cal_list=[]
cal_list2=[]
substring = '__'

calendar_items = a.calendar.view(start=start, end=end).order_by('subject', 'categories')

for cal in a.calendar.all():
    if x==0:
        attributes = inspect.getmembers(CalendarItem, lambda a: not (inspect.isroutine(a)))
        cal_list = ([a for a in attributes if not(a[0].startswith('__') and a[0].endswith('__'))])
        for i in cal_list:
            if not substring in str(i):
                cal_list2.append(i)
        x = x + 1

start_string='start'
end_string='end'
required_string='required_attendees'
subject_string='subject'
cal_list3=[]
for k in cal_list2:
    if start_string in k or end_string in k or required_string in k or subject_string in k:
        cal_list3.append(k)

for i in cal_list3:
    print(str(i)+'\n')