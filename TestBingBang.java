package com.bingbangtheory;

import java.util.Arrays;

public class TestBingBang {
	
	
	public static void main(String args[]) {
		
		int number=21;
		String [] result= new String[number];
		
		for(int i=0;i<number;i++) {
			int aux = i+1;
			if(ismultriplo(aux,3)) {
				if(ismultriplo(aux,5)){
					if(ismultriplo(aux,7)){
						result[i]="BigBangTheory";
					}else{
						result[i]="BigBang";
					}
				}else if(ismultriplo(aux,7)){
					result[i]="BigTheory";
				}else{
					result[i]="big";
				}
			}else if (ismultriplo(aux,5)) {
				 if (ismultriplo(aux,7)) {
					 result[i]="BangTheory";
				 }else {
					 result[i]="bang";
				 }
			}else if (ismultriplo(aux,7)) {
				result[i]="theory";
			}else {
				result[i]=String.valueOf(i+1);
			}
		}

		Arrays.stream(result).forEach(aux -> System.out.println(aux));
	}
	
	public static boolean ismultriplo(int n1,int n2) {
		if(n1 % n2 == 0)
			return true;
		else
			return false;
	}

}
