#-*- coding: utf-8 -*-
#
#  main.py
#  MyMobile
#
#  Created by Lemir B El Harfouche on 7/20/12.
#  Copyright __MyCompanyName__ 2012. All rights reserved.
#

#import modules required by application
import objc
import Foundation
import AppKit

from PyObjCTools import AppHelper

# import modules containing classes required to start application and load MainMenu.nib
import AppDelegate
import MobileController

# pass control to AppKit
AppHelper.runEventLoop()
