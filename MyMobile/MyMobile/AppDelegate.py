#-*- coding: utf-8 -*-
#
#  MyMobileAppDelegate.py
#  MyMobile
#
#  Created by Lemir B El Harfouche on 7/20/12.
#  Copyright __MyCompanyName__ 2012. All rights reserved.
#

from Foundation import *
from AppKit import *

class AppDelegate(NSObject):

  textfield = objc.IBOutlet()

  def applicationDidFinishLaunching_(self, sender):
    self.textfield.setEditable_(0)
    self.textfield.setSelectable_(0)
    NSLog("Application did finish launching.")


