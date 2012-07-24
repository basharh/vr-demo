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
import os

class AppDelegate(NSObject):

  textfield = objc.IBOutlet()
  dirname = ""
  appMessage = "hello control";
  T9Data = {}

  def addWordToDict(self, index, word):
    if ( index not in self.T9Data ):
      self.T9Data[index] = []
    self.T9Data[index].append(word);

  # Given a word, returns an int representing the 
  # corresponding T9 key sequence
  def getWordIndex(self, word):
    index = ""
    for c in word:
      c = c.lower();
      if ( c == "'" ):
        index += "1";
      elif ( c == "a" or c == "b" or c == "c" ):
        index += "2";
      elif ( c == "d" or c == "e" or c == "f" ):
        index += "3";
      elif ( c == "g" or c == "h" or c == "i" ):
        index += "4";
      elif ( c == "j" or c == "k" or c == "l" ):
        index += "5";
      elif ( c == "m" or c == "n" or c == "o" ):
        index += "6";
      elif ( c == "p" or c == "q" or c == "r" or c == "s" ):
        index += "7";
      elif ( c == "t" or c == "u" or c == "v" ):
        index += "8";
      elif ( c == "w" or c == "x" or c == "y" or c == "z" ):
        index += "9";
    return int(index);

  def loadDict(self):
    dirname = os.path.dirname( os.path.realpath(__file__) );
    NSLog("Path to current file: " + dirname );
    #dictPath = dirname + '/english_concise.txt'
    dictPath = dirname + '/english.txt'
    NSLog("Path to dict: " + dictPath);
    f = open(dictPath, 'r')

    for line in f:
      #NSLog("Line is: " + line );
      word = line.strip();
      index = self.getWordIndex( word );
      self.addWordToDict( index, word );

  def applicationDidFinishLaunching_(self, sender):
    self.textfield.setEditable_(0)
    self.textfield.setSelectable_(0)
    NSLog("Application did finish launching.")
    self.loadDict();
    nc = NSNotificationCenter.defaultCenter()
    nc.postNotificationName_object_userInfo_(
      'love_note', None, {'path':'xyz'})
    NSLog("T9Data Length: " + str( len(self.T9Data) )  );

    NSLog( str( self.T9Data ) ); 
  #def loadDictionary_(self):
    

